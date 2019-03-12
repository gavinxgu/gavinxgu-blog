// 注入环境变量
require('dotenv').config()
// 引入模块
const COS = require('cos-nodejs-sdk-v5')
const cleanDeep = require('clean-deep')
const fs = require('fs')
const nodePath = require('path')

const { COSSecretId, COSSecretKey, COSBucket, COSRegion } = process.env
// 使用永久密钥创建实例
const cos = new COS({
  SecretId: COSSecretId,
  SecretKey: COSSecretKey,
})

function getBucket({ Prefix }) {
  return new Promise((resolve, reject) => {
    cos.getBucket(
      cleanDeep({
        Bucket: COSBucket,
        Region: COSRegion,
        Prefix,
      }),
      function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

function getObjectUrl(key) {
  return cos.getObjectUrl({
    Bucket: COSBucket,
    Region: COSRegion,
    Key: key,
    Sign: false, // 不签名
  })
}

function headObject(key) {
  return new Promise((resolve, reject) => {
    cos.headObject(
      {
        Bucket: COSBucket,
        Region: COSRegion,
        Key: key,
      },
      function(err, data) {
        if (err) {
          reject(err)
        } else {
          resolve(data)
        }
      }
    )
  })
}

module.exports = async Prefix => {
  if (COSSecretId && COSSecretKey && COSBucket && COSRegion) {
    const { Contents } = await getBucket({ Prefix })
    const urls = Contents.filter(item => Number(item.Size)).map(item => {
      return getObjectUrl(item.Key)
    })
    fs.writeFileSync(
      nodePath.resolve(__dirname, `../content/albums/${Prefix}.json`),
      JSON.stringify(urls, null, ' ')
    )
    return urls
  }
  return JSON.parse(
    fs.readFileSync(
      nodePath.resolve(__dirname, `../content/albums/${Prefix}.json`)
    )
  )
}
