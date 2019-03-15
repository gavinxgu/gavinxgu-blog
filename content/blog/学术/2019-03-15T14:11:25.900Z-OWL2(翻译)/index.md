---
# id不要改动
id: 1552659085900
title: OWL2(翻译)
tags: ['学术']
date: 2019-03-15T14:11:25.900Z
cover:
published: true
---

[OWL 2 Web Ontology Language Primer (Second Edition)](https://www.w3.org/TR/owl2-primer/#Introduction)

## 2.What is OWL 2?

OWL 2 is a language for expressing ontologies. The term ontology has a complex history both in and out of computer science, but we use it to mean a certain kind of computational artifact – i.e., something akin to a program, an XML schema, or a web page – generally presented as a document. An ontology is a set of precise descriptive statements about some part of the world (usually referred to as the domain of interest or the subject matter of the ontology). Precise descriptions satisfy several purposes: most notably, they prevent misunderstandings in human communication and they ensure that software behaves in a uniform, predictable way and works well with other software.

In order to precisely describe a domain of interest, it is helpful to come up with a set of central terms – often called vocabulary – and fix their meaning. Besides a concise natural language definition, the meaning of a term can be characterized by stating how this term is interrelated to the other terms. A terminology, providing a vocabulary together with such interrelation information constitutes an essential part of a typical OWL 2 document. Besides this terminological knowledge, an ontology might also contain so called assertional knowledge that deals with concrete objects of the considered domain rather than general notions.

OWL 2 is not a programming language: OWL 2 is declarative, i.e. it describes a state of affairs in a logical way. Appropriate tools (so-called reasoners) can then be used to infer further information about that state of affairs. How these inferences are realized algorithmically is not part of the OWL document but depends on the specific implementations. Still, the correct answer to any such question is predetermined by the formal semantics (which comes in two versions: the Direct Semantics [OWL 2 Direct Semantics] and the RDF-Based Semantics [OWL 2 RDF-Based Semantics]). Only implementations that comply with these semantics will be regarded as OWL 2 conformant (see [OWL 2 Conformance]). Through its declarative nature, the activity of creating OWL 2 documents is conceptually different from programming. Still, as in both cases complex formal documents are created, certain notions from software engineering can be transferred to ontology engineering, such as methodological and collaborative aspects, modularization, patterns, etc.

OWL 2 is not a schema language for syntax conformance. Unlike XML, OWL 2 does not provide elaborate means to prescribe how a document should be structured syntactically. In particular, there is no way to enforce that a certain piece of information (like the social security number of a person) has to be syntactically present. This should be kept in mind as OWL has some features that a user might misinterpret this way.

OWL 2 is not a database framework. Admittedly, OWL 2 documents store information and so do databases. Moreover a certain analogy between assertional information and database content as well as terminological information and database schemata can be drawn. However, usually there are crucial differences in the underlying assumptions (technically: the used semantics). If some fact is not present in a database, it is usually considered false (the so-called closed-world assumption) whereas in the case of an OWL 2 document it may simply be missing (but possibly true), following the open-world assumption. Moreover, database schemata often come with the prescriptive constraint semantics mentioned above. Still, technically, databases provide a viable backbone in many ontology-oriented systems.

## 3.Modeling Knowledge: Basic Notions

OWL 2 is a knowledge representation language, designed to formulate, exchange and reason with knowledge about a domain of interest. Some fundamental notions should first be explained to understand how knowledge is represented in OWL 2. These basic notions are:

Axioms: the basic statements that an OWL ontology expresses
Entities: elements used to refer to real-world objects
Expressions: combinations of entities to form complex descriptions from basic ones
While OWL 2 aims to capture knowledge, the kind of “knowledge” that can be represented by OWL does of course not reflect all aspects of human knowledge. OWL can be considered as a powerful general-purpose modeling language for certain parts of human knowledge. The results of the modeling processes are called ontologies – a terminology that also helps to avoid confusion since the term “model” is often used in a rather different sense in knowledge representation.

Now, in order to formulate knowledge explicitly, it is useful to assume that it consists of elementary pieces that are often referred to as statements or propositions. Statements like “it is raining” or “every man is mortal” are typical examples for such basic propositions. Indeed, every OWL 2 ontology is essentially just a collection of such basic “pieces of knowledge.” Statements that are made in an ontology are called axioms in OWL 2, and the ontology asserts that its axioms are true. In general, OWL statements might be either true or false given a certain state of affairs. This distinguishes them from entities and expressions as described further below.

When humans think, they draw consequences from their knowledge. An important feature of OWL is that it captures this aspect of human intelligence for the forms of knowledge that it can represent. But what does it mean, generally speaking, that a statement is a consequence of other statements? Essentially it means that this statement is true whenever the other statements are. In OWL terms: we say, a set of statements A entails a statement a if in any state of affairs wherein all statements from A are true, also a is true. Moreover, a set of statements may be consistent (that is, there is a possible state of affairs in which all the statements in the set are jointly true) or inconsistent (there is no such state of affairs). The formal semantics of OWL specifies, in essence, for which possible “states of affairs” a particular set of OWL statements is true.

There are OWL tools – reasoners – that can automatically compute consequences. The way ontological axioms interact can be very subtle and difficult for people to understand. This is both a strength and a weakness of OWL 2. It is a strength because OWL 2 tools can discover information that a person would not have spotted. This allows knowledge engineers to model more directly and the system to provide useful feedback and critique of the modeling. It is a weakness because it is comparatively difficult for humans to immediately foresee the actual effect of various constructs in various combinations. Tool support ameliorates the situation but successful knowledge engineering often still requires some amount of training and experience.

Having a closer look at statements in OWL, we see that they are rarely “monolithic” but more often have some internal structure that can be explicitly represented. They normally refer to objects of the world and describe them e.g. by putting them into categories (like “Mary is female”) or saying something about their relation (“John and Mary are married”). All atomic constituents of statements, be they objects (John, Mary), categories (female) or relations (married) are called entities. In OWL 2, we denote objects as individuals, categories as classes and relations as properties. Properties in OWL 2 are further subdivided. Object properties relate objects to objects (like a person to their spouse), while datatype properties assign data values to objects (like an age to a person). Annotation properties are used to encode information about (parts of) the ontology itself (like the author and creation date of an axiom) instead of the domain of interest.

As a central feature of OWL, names of entities can be combined into expressions using so called constructors. As a basic example, the atomic classes “female” and “professor” could be combined conjunctively to describe the class of female professors. The latter would be described by an OWL class expression, that could be used in statements or in other expressions. In this sense, expressions can be seen as new entities which are defined by their structure. In OWL, the constructors for each sort of entity vary greatly. The expression language for classes is very rich and sophisticated, whereas the expression language for properties is much less so. These differences have historical as well as technical reasons.

## 4.Classes, Properties, and Individuals – And Basic Modeling With Them

After these general considerations, we now engage in the details of modeling with OWL 2. In the subsequent sections, we introduce the essential modeling features that OWL 2 offers, provide examples and give some general comments on how to use them. We proceed from basic features, which are essentially available in any modeling language, to more advanced constructs.

Thereby we will represent information about a particular family. Note that we do not intend this example to be representative of the sorts of domains OWL should be used for, or as a canonical example of good modeling with OWL, or a correct representation of the rather complex, shifting, and culturally dependent domain of families. Instead, we intend it to be a rather simple exhibition of various features of OWL.

### 4.1.Classes and Instances

类和实例，一个名叫 mary 的个体(individual)，是一个 person 类型

```xml
<ClassAssertion>
    <Class IRI="Person"/>
    <NamedIndividual IRI="Mary"/>
</ClassAssertion>
```

### 4.2.Class Hierarchies

类的继承，女人是人的子类，母亲是女人的子类。

```xml
 <SubClassOf>
   <Class IRI="Woman"/>
   <Class IRI="Person"/>
 </SubClassOf>

<SubClassOf>
   <Class IRI="Mother"/>
   <Class IRI="Woman"/>
</SubClassOf>
```

有的类也许是指向同一个类，OWL 提供一种机制来表示他们在语义上是等价的。

```xml
<EquivalentClasses>
   <Class IRI="Person"/>
   <Class IRI="Human"/>
</EquivalentClasses>
```

### 4.3.Class Disjointness

类的不关联性。一个类的成员都不是另一个类的成员。

```xml
<DisjointClasses>
     <Class IRI="Woman"/>
     <Class IRI="Man"/>
</DisjointClasses>
```

### 4.4.Object Properties

之前的章节我们描述了个体，类的成员，以及类的实体如何相关联，然而我们经常会需要描述个体之间的关系。

比如我们需要描述一个家庭关系，Mary 是 John 的妻子。

```xml
<ObjectPropertyAssertion>
   <ObjectProperty IRI="hasWife"/>
   <NamedIndividual IRI="John"/>
   <NamedIndividual IRI="Mary"/>
</ObjectPropertyAssertion>
```

这个实体描述了个体是如何关联的，hasWife 叫做 properties（特性）。

我们在建模时尽可能避免读者的直觉理解错误，用 has、Of、By 等词来表示两者的主被动关系。

也可以定义一个否定的关联，Mary 不是 John 的妻子。

```xml
<NegativeObjectPropertyAssertion>
   <ObjectProperty IRI="hasWife"/>
   <NamedIndividual IRI="Bill"/>
   <NamedIndividual IRI="Mary"/>
</NegativeObjectPropertyAssertion>
```

### 4.5.Property Hierarchies

特性可以继承，如果 A 是 B 的妻子，那 A 也是 B 的配偶。

```xml
<SubObjectPropertyOf>
   <ObjectProperty IRI="hasWife"/>
   <ObjectProperty IRI="hasSpouse"/>
</SubObjectPropertyOf>
```

### 4.6.Domain and Range Restrictions

域和范围约束。对于一个特性来说，有一个作用者(domain)和被作用者(range)，可以对此做约束。

B 是 A 的妻子 明显暗示 B 是一个女人 A 是一个男人。OWL 提供一种机制来表示这种暗示的关系。
(原文: So in a way, the statement that two individuals are related via a certain property carries implicit additional information about these individuals.)

```xml
 <ObjectPropertyDomain>
   <ObjectProperty IRI="hasWife"/>
   <Class IRI="Man"/>
 </ObjectPropertyDomain>
 <ObjectPropertyRange>
   <ObjectProperty IRI="hasWife"/>
   <Class IRI="Woman"/>
 </ObjectPropertyRange>
```

### 4.7.Equality and Inequality of Individuals

等价和不等价个体。之前章节提到的 Mary 和 John，我们可以推断他们不是同一个人，因为他们是分属于 disjoint 的两个类。但是如果我们说到 Bill 和 John，我们并不能确定他是不同的两个人。

当然我们也可以指定 James 和 Jim 是同一个人。

```xml
<DifferentIndividuals>
   <NamedIndividual IRI="John"/>
   <NamedIndividual IRI="Bill"/>
</DifferentIndividuals>

<SameIndividual>
   <NamedIndividual IRI="James"/>
   <NamedIndividual IRI="Jim"/>
</SameIndividual>
```

### 4.8.Datatypes

我们已经通过类成员以及他们的和其他个体的关系来描述个体。但是在大多数情况下，一个个体是由 dataValues 来描述的，比如说生日、邮箱地址等。为了描述这样的信息，OWL 提出一个新的特性叫 Datatype properties。大多数的 XML Schema datatypes 可以被使用。

下面是一个例子说明 Jack 是 53 岁。

```xml
 <NegativeDataPropertyAssertion>
   <DataProperty IRI="hasAge"/>
   <NamedIndividual IRI="Jack"/>
   <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">53</Literal>
 </NegativeDataPropertyAssertion>
```

Jack 不是 53 岁。

```xml
 <NegativeDataPropertyAssertion>
   <DataProperty IRI="hasAge"/>
   <NamedIndividual IRI="Jack"/>
   <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">53</Literal>
 </NegativeDataPropertyAssertion>
```

数据特性也可以拥有域范围约束。只不过范围的部分不是类，而是一个 datatype。下面的例子是说人都有年龄，年龄是非负的整数。

```xml
 <DataPropertyDomain>
   <DataProperty IRI="hasAge"/>
   <Class IRI="Person"/>
 </DataPropertyDomain>
 <DataPropertyRange>
   <DataProperty IRI="hasAge"/>
   <Datatype IRI="http://www.w3.org/2001/XMLSchema#nonNegativeInteger"/>
 </DataPropertyRange>
```

## 5.Advanced Class Relationships

我们这个章节讨论如何将类、特性和个体打包成一个新的类。

### 5.1.Complex Classes

#### 5.1.1.Intersection(&)

The intersection of two classes consists of exactly those individuals which are instances of both classes.

下面的例子讲述了，母亲的所有 object，是 woman 和 parent 的所有 object 的交集

```xml
<EquivalentClasses>
   <Class IRI="Mother"/>
   <ObjectIntersectionOf>
     <Class IRI="Woman"/>
     <Class IRI="Parent"/>
   </ObjectIntersectionOf>
 </EquivalentClasses>
```

#### 5.1.2.Union(|)

The union of two classes contains every individual which is contained in at least one of these classes.

因此我们可以描述，父母类是父亲类和母亲类的联合类是等价的。（并集）

```xml
 <EquivalentClasses>
   <Class IRI="Parent"/>
   <ObjectUnionOf>
     <Class IRI="Mother"/>
     <Class IRI="Father"/>
   </ObjectUnionOf>
 </EquivalentClasses>
```

#### 5.1.3.Complement

补集，Parent 的补集和 Person 的交集，是没有孩子的人

```xml
<EquivalentClasses>
   <Class IRI="ChildlessPerson"/>
   <ObjectIntersectionOf>
     <Class IRI="Person"/>
     <ObjectComplementOf>
       <Class IRI="Parent"/>
     </ObjectComplementOf>
   </ObjectIntersectionOf>
 </EquivalentClasses>
```

#### 5.1.4.SubClass

it is also possible to use class constructors together with a subclass statement in order to indicate necessary, but not sufficient, conditions for a class. 可以使用子类，来描述必要非充分的条件。以下例子，所有的爷爷都是男都是并且是父母。但是反过来是不对的。

```xml
 <SubClassOf>
   <Class IRI="Grandfather"/>
   <ObjectIntersectionOf>
     <Class IRI="Man"/>
     <Class IRI="Parent"/>
   </ObjectIntersectionOf>
 </SubClassOf>
```

复杂类可以用在所有命名类可用的场景，比如说类型断言。Jack 是一个人但是不是父母。

```xml
 <ClassAssertion>
   <ObjectIntersectionOf>
    <Class IRI="Person"/>
    <ObjectComplementOf>
      <Class IRI="Parent"/>
    </ObjectComplementOf>
   </ObjectIntersectionOf>
   <NamedIndividual IRI="Jack"/>
 </ClassAssertion>
```

## 5.2.Property Restrictions

这里还不是特别清楚

### 5.2.1.SomeValuesFrom

一个特性约束叫 existential quantification，定义一个由一些个体组成的类，通过一个特殊的特性和另一个类的个体发生联系。

以下是一个例子，Parent 是通过 hasChild 这个特性约束来和 Person 发生关系的。

```xml
<EquivalentClasses>
   <Class IRI="Parent"/>
   <ObjectSomeValuesFrom>
     <ObjectProperty IRI="hasChild"/>
     <Class IRI="Person"/>
   </ObjectSomeValuesFrom>
 </EquivalentClasses>
```

### 5.2.2.AllValuesFrom

另一个属性限制，称为通用量化，用于描述一类个体，所有相关个体必须是一个给定类的实例。如果他们所有的孩子都是快乐的人，我们可以使用以下陈述来表明某人是一个幸福的人。

```xml
 <EquivalentClasses>
   <Class IRI="HappyPerson"/>
   <ObjectAllValuesFrom>
     <ObjectProperty IRI="hasChild"/>
     <Class IRI="HappyPerson"/>
   </ObjectAllValuesFrom>
 </EquivalentClasses>
```

### 5.2.3

The usage of property restrictions may cause some conceptual confusion to “modeling beginners.” As a rule of thumb, when translating a natural language statement into a logical axiom, existential quantification occurs far more frequently. Natural language indicators for the usage of universal quantification are words like “only,” “exclusively,” or “nothing but.”

There is one particular misconception concerning the universal role restriction. As an example, consider the above happiness axiom. The intuitive reading suggests that in order to be happy, a person must have at least one happy child. Yet, this is not the case: any individual that is not a “starting point” of the property hasChild is a class member of any class defined by universal quantification over hasChild. Hence, by our above statement, every childless person would be qualified as happy. In order to formalize the aforementioned intended reading, the statement would have to read as follows:

```xml
<EquivalentClasses>
   <Class IRI="HappyPerson"/>
   <ObjectIntersectionOf>
     <ObjectAllValuesFrom>
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="HappyPerson"/>
     </ObjectAllValuesFrom>
     <ObjectSomeValuesFrom>
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="HappyPerson"/>
     </ObjectSomeValuesFrom>
   </ObjectIntersectionOf>
 </EquivalentClasses>
```

### 5.2.4.HasValue

John 的孩子

```xml
 <EquivalentClasses>
   <Class IRI="JohnsChildren"/>
   <ObjectHasValue>
     <ObjectProperty IRI="hasParent"/>
     <NamedIndividual IRI="John"/>
   </ObjectHasValue>
 </EquivalentClasses>
```

### 5.2.5.HasSelf

作为个人与财产相互关联的特殊情况，个人可能与自身联系在一起。以下示例显示了如何表达所有自恋者都喜欢自己的想法。

```xml
<EquivalentClasses>
   <Class IRI="NarcisticPerson"/>
   <ObjectHasSelf>
     <ObjectProperty IRI="loves"/>
   </ObjectHasSelf>
</EquivalentClasses>
```

### 5.3.Property Cardinality Restrictions

属性的基数限制。

使用通用量化，我们讨论一些关于某人的所有孩子，而存在量化允许我们参考（至少）其中一个。但是，我们可能希望指定参与限制的个人数量。实际上，我们可以根据孩子的数量来构建课程。以下示例说明 John 最多有四个孩子，他们自己是父母：

```xml
 <ClassAssertion>
   <ObjectMaxCardinality cardinality="4">
     <ObjectProperty IRI="hasChild"/>
     <Class IRI="Parent"/>
   </ObjectMaxCardinality>
   <NamedIndividual IRI="John"/>
 </ClassAssertion>
```

同样，也可以通过说约翰是至少有两个孩子是父母的个体类的实例来声明最小数量

```xml
<ClassAssertion>
   <ObjectMinCardinality cardinality="2">
     <ObjectProperty IRI="hasChild"/>
     <Class IRI="Parent"/>
   </ObjectMinCardinality>
   <NamedIndividual IRI="John"/>
</ClassAssertion>
```

如果我们碰巧知道父母的约翰儿童的确切人数，可以指定如下：

```xml
<ClassAssertion>
   <ObjectExactCardinality cardinality="3">
     <ObjectProperty IRI="hasChild"/>
     <Class IRI="Parent"/>
   </ObjectExactCardinality>
   <NamedIndividual IRI="John"/>
</ClassAssertion>
```

在基数限制中，提供类是可选的;如果我们只想谈谈 John 所有孩子的数量，我们可以写下以下内容

```xml
<ClassAssertion>
   <ObjectExactCardinality cardinality="5">
     <ObjectProperty IRI="hasChild"/>
   </ObjectExactCardinality>
   <NamedIndividual IRI="John"/>
</ClassAssertion>
```

### 5.4.Enumeration of Individuals

描述类的一种非常简单的方法就是枚举其所有实例。 OWL 提供了这种可能性，例如我们可以创造一类生日嘉宾

```xml
<EquivalentClasses>
   <Class IRI="MyBirthdayGuests"/>
   <ObjectOneOf>
     <NamedIndividual IRI="Bill"/>
     <NamedIndividual IRI="John"/>
     <NamedIndividual IRI="Mary"/>
   </ObjectOneOf>
</EquivalentClasses>
```

## 6 Advanced Use of Properties

### 6.1 Property Characteristics

#### 6.1.1 InverseObjectProperties

有时可以通过获取另一个属性并改变其方向来获得一个属性，即反转它。例如，属性 hasParent 可以定义为 hasChild 的反向属性。

```xml
<InverseObjectProperties>
   <ObjectProperty IRI="hasParent"/>
   <ObjectProperty IRI="hasChild"/>
</InverseObjectProperties>
```

#### 6.1.2 ObjectInverseOf

例如，这将允许推导出任意个体 A 和 B，其中 A 通过 hasChild 属性链接到 B，B 和 A 也通过 hasParent 属性相互链接。但是，如果我们只想在类表达式中使用它，我们不需要为属性的反转显式指定名称。我们可以直接将它称为 hasChild-inverse，而不是使用新的 hasParent 属性来定义 Orphan 类：

```xml
<EquivalentClasses>
   <Class IRI="Orphan"/>
   <ObjectAllValuesFrom>
     <ObjectInverseOf>
       <ObjectProperty IRI="hasChild"/>
     </ObjectInverseOf>
     <Class IRI="Dead"/>
   </ObjectAllValuesFrom>
</EquivalentClasses>
```

#### 6.1.2 SymmetricObjectProperty

在某些情况下，属性及其反转重合，或者换句话说，属性的方向无关紧要。例如，如果将 B 与 A 相关联，则属性 hasSpouse 将 A 与 B 精确关联。出于显而易见的原因，具有此特征的属性称为对称，并且可以指定如下

```xml
<SymmetricObjectProperty>
   <ObjectProperty IRI="hasSpouse"/>
</SymmetricObjectProperty>
```

#### 6.1.3 AsymmetricObjectProperty

另一方面，属性也可以是不对称的，这意味着如果它将 A 与 B 连接起来，它就永远不会将 B 与 A 连接。显然（不包括时间旅行产生的矛盾情景），属性 hasChild 就是这种情况，并表示如下

```xml
<AsymmetricObjectProperty>
   <ObjectProperty IRI="hasChild"/>
 </AsymmetricObjectProperty>
```

#### 6.1.4 DisjointObjectProperties

注意，不对称是一种比非对称更强的概念。同样，对称是一种比非非对称更强的概念。

以前，我们认为子属性类似于子类。事实证明，将类不相交的概念转移到属性也是有意义的：如果没有两个属性被两个属性相互链接，则两个属性是不相交的。根据普通法，我们可以说，父母与子女的婚姻不会发生

```xml
<DisjointObjectProperties>
   <ObjectProperty IRI="hasParent"/>
   <ObjectProperty IRI="hasSpouse"/>
</DisjointObjectProperties>
```

#### 6.1.5 ReflexiveObjectProperty

属性也可以是反身的：这样的属性将一切都与自身联系起来。对于以下示例，请注意每个人都将自己作为亲戚。

```xml
<ReflexiveObjectProperty>
   <ObjectProperty IRI="hasRelative"/>
</ReflexiveObjectProperty>
```

#### 6.1.6 IrreflexiveObjectProperty

此外，属性可以是反射性的，这意味着任何个体都不能通过这样的角色与自身相关联。一个典型的例子如下，它简单地说明没有人可以成为他自己的父母。

```xml
 <IrreflexiveObjectProperty>
   <ObjectProperty IRI="parentOf"/>
 </IrreflexiveObjectProperty>
```

#### 6.1.7 FunctionalObjectProperty

接下来，考虑 hasHusband 属性。因为每个人只能有一个丈夫（我们为了这个例子而认为是理所当然的），所以每个人都可以通过 hasHusband 属性与至多一个另外的人联系起来。这种属性称为功能，描述如下

```xml
<FunctionalObjectProperty>
   <ObjectProperty IRI="hasHusband"/>
</FunctionalObjectProperty>
```

#### 6.1.7 InverseFunctionalObjectProperty

这表明个人可以是至多一个另外的人的丈夫。该示例还指出了功能和反向功能之间的差异，因为在多义的情况下，前一个公理是有效的，而后者则不是

```xml
 <InverseFunctionalObjectProperty>
   <ObjectProperty IRI="hasHusband"/>
 </InverseFunctionalObjectProper
```

#### 6.1.8 TransitiveObjectProperty

A transitive property interlinks two individuals A and C whenever it interlinks A with B and B with C for some individual B.

```xml
<TransitiveObjectProperty>
   <ObjectProperty IRI="hasAncestor"/>
</TransitiveObjectProperty>
```

## 6.2 Property Chains

如果有一个 hasParent 属性链，那么前一节中的最后一个示例暗示 hasAncestor 属性的存在，我们可能希望更具体一些，并定义一个 hasGrandparent 属性。从技术上讲，这意味着我们希望 hasGrandparent 连接所有通过两个 hasParent 属性链连接的个体。与之前的 hasAncestor 示例相比，我们不希望 hasParent 是 hasGrandparent 的特例，也不希望 hasGrandparent 引用曾祖父母等。我们可以表示每个这样的链都必须由 hasGrandparent 属性跨越，如下所示

```xml
 <SubObjectPropertyOf>
   <ObjectPropertyChain>
     <ObjectProperty IRI="hasParent"/>
     <ObjectProperty IRI="hasParent"/>
   </ObjectPropertyChain>
   <ObjectProperty IRI="hasGrandparent"/>
 </SubObjectPropertyOf>
```

### 6.3 Keys

类中的每个个体和其他个体作区分的唯一码就是 key。比如身份证号，原文是 social security number

```xml
<HasKey>
   <Class IRI="Person"/>
   <DataProperty IRI="hasSSN"/>
</HasKey>
```

## 7 Advanced Use of Datatypes

首先，数据值被分组为数据类型，我们在 4.8 节中看到了如何使用数据类型属性的范围限制来指示此属性可以链接到的值的类型。此外，可以通过约束或组合现有数据类型来表达和定义新数据类型。可以通过从 XML Schema 数据类型[XML Schema Datatypes]借用的所谓 facet 来限制数据类型。在下面的示例中，我们通过将数据类型 integer 限制为（包含）0 到 150 之间的值来为人的年龄定义新的数据类型。

```xml
<DatatypeDefinition>
    <Datatype IRI="personAge"/>
    <DatatypeRestriction>
       <Datatype IRI="http://www.w3.org/2001/XMLSchema#integer"/>
       <FacetRestriction facet="http://www.w3.org/2001/XMLSchema#minInclusive">
         <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">0</Literal>
       </FacetRestriction>
       <FacetRestriction facet="http://www.w3.org/2001/XMLSchema#maxInclusive">
         <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">150</Literal>
       </FacetRestriction>
    </DatatypeRestriction>
</DatatypeDefinition>
```

同样，数据类型可以像补集，交集和联合一样组合。因此，假设我们已经定义了数据类型 minorAge，我们可以通过从 personAge 中排除 minorAge 的所有数据值来定义数据类型 majorAge

```xml
<DatatypeDefinition>
    <Datatype IRI="majorAge"/>
    <DataIntersectionOf>
       <Datatype IRI="personAge"/>
       <DataComplementOf>
         <Datatype IRI="minorAge"/>
       </DataComplementOf>
    </DataIntersectionOf>
</DatatypeDefinition>
```

而且，只需枚举它包含的数据值就可以生成新的数据类型。

```xml
<DatatypeDefinition>
    <Datatype IRI="toddlerAge"/>
    <DataOneOf>
      <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">1</Literal>
      <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">2</Literal>
    </DataOneOf>
</DatatypeDefinition>
```

在 6.1 节中，我们看到了表征对象属性的方法。其中一些也可用于数据类型属性。例如，我们可以通过将 hasAge 数据类型属性表征为功能来表达每个人只有一个年龄

```xml
<FunctionalDataProperty>
  <DataProperty IRI="hasAge"/>
</FunctionalDataProperty>
```

可以通过对数据类型属性的限制来定义新类。以下示例将班级青少年定义为年龄在 13 到 19 岁之间的所有个人。

```xml
<SubClassOf>
  <Class IRI="Teenager"/>
  <DataSomeValuesFrom>
    <DataProperty IRI="hasAge"/>
    <DatatypeRestriction>
      <Datatype IRI="http://www.w3.org/2001/XMLSchema#integer"/>
      <FacetRestriction facet="http://www.w3.org/2001/XMLSchema#minExclusive">
        <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">12</Literal>
      </FacetRestriction>
      <FacetRestriction facet="http://www.w3.org/2001/XMLSchema#maxInclusive">
        <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#integer">19</Literal>
      </FacetRestriction>
    </DatatypeRestriction>
  </DataSomeValuesFrom>
</SubClassOf>
```

## 8 Document Information and Annotations

因此，例如，我们可以将信息添加到我们的本体的一个类中，给出其含义的自然语言描述

```xml
<AnnotationAssertion>
   <AnnotationProperty IRI="&rdfs;comment"/>
   <IRI>Person</IRI>
   <Literal>Represents the set of all people.</Literal>
</AnnotationAssertion>
```

以下是带注释的公理的示例。

```xml
<SubClassOf>
   <Annotation>
       <AnnotationProperty IRI="&rdfs;comment"/>
       <Literal datatypeIRI="http://www.w3.org/2001/XMLSchema#string">"States that every man is a person."</Literal>
   </Annotation>
   <Class IRI="Man"/>
   <Class IRI="Person"/>
</SubClassOf>
```

### 8.2 Ontology Management

在 OWL 中，关于主题的一般信息几乎总是被收集到本体中，然后由各种应用程序使用。我们还可以为 OWL 本体提供名称，这通常是本体文档在 Web 中的位置。如果主题的特定信息由不同的应用程序使用，也可以放在本体中

```xml
<Ontology ...
   ontologyIRI="http://example.com/owl/families">
   ...
 </Ontology>
```

We place OWL ontologies into OWL documents, which are then placed into local filesystems or on the World Wide Web. Aside from containing an OWL ontology, OWL documents also contain information about transforming the short names normally used in OWL ontologies (e.g., Person) into IRIs, by providing the expansion for prefixes. The IRI is then the concatenation of the prefix expansion and the reference.

In our example we have so far used a number of prefixes, including xsd and the empty prefix. The former prefix has been used in compact names for XML Schema datatypes, whose IRIs are fixed by the XML Schema recommendation. We thus must use the standard expansion for xsd, which is http://www.w3.org/2001/XMLSchema#. The expansion we pick for the other prefix will affect the names of the classes, properties, and individuals in our ontology, as well as the name of the ontology itself. If we are going to put the ontology on the web, we should pick an expansion that is in some part of the web that we control, so that we are not using someone else's names by accident. (Here we use a made-up place that no one controls.) The two XML-based syntaxes need namespaces for built-in names and also can use XML entity references for namespaces. In general, it should be noted that the available abbreviation mechanisms and their specific syntax is different in each of the serializations of OWL, even in cases where similar keywords are used.

```xml
 <!DOCTYPE Ontology [
    <!ENTITY xsd "http://www.w3.org/2001/XMLSchema#" >
 ]>
 <Ontology
   xml:base="http://example.com/owl/families/"
   ontologyIRI="http://example.com/owl/families"
   xmlns="http://www.w3.org/2002/07/owl#">
   <Prefix name="owl" IRI="http://www.w3.org/2002/07/owl#"/>

  ...
 </Ontology>
```

在 OWL 中，将一个本体中存储的一般信息重用于其他本体也是很常见的。 OWL 不需要复制此信息，而是允许使用 import 语句导入其他本体中的整个本体的内容，如下所示

```xml
<Prefix name="otherOnt" IRI="http://example.org/otherOntologies/families/"/>
<Import>http://example.org/otherOntologies/families.owl</Import>
```

由于语义 Web 和本体构造是分布式的，因此本体对于相同的概念，属性或个体使用不同的名称是常见的。正如我们所看到的，OWL 中的几个结构可以用来表示不同的名称引用相同的类，属性或个体，因此，例如，我们可以 - 而不是繁琐地重命名实体 - 将我们的本体中使用的名称绑定到导入的本体中使用的名称如下

```xml
<SameIndividual>
   <NamedIndividual IRI="John"/>
   <NamedIndividual abbreviatedIRI="otherOnt:JohnBrown"/>
 </SameIndividual>

 <SameIndividual>
   <NamedIndividual IRI="Mary"/>
   <NamedIndividual abbreviatedIRI="otherOnt:MaryBrown"/>
 </SameIndividual>

 <EquivalentClasses>
   <Class IRI="Adult"/>
   <Class abbreviatedIRI="otherOnt:Grownup"/>
 </EquivalentClasses>

 <EquivalentObjectProperties>
   <ObjectProperty IRI="hasChild"/>
   <ObjectProperty abbreviatedIRI="otherOnt:child"/>
 </EquivalentObjectProperties>

 <EquivalentDataProperties>
   <DataProperty IRI="hasAge"/>
   <DataProperty abbreviatedIRI="otherOnt:age"/>
 </EquivalentDataProperties>
```

### 8.3 Entity Declarations

为了帮助管理本体，OWL 具有声明的概念。基本思想是每个类，属性或个体应该在本体中声明，然后它可以用于导入该本体的本体和本体。

在曼彻斯特语句中，声明是隐含的。提供有关类，属性或个人的信息的构造在需要时隐式声明该类，属性或个体。其他语法具有显式声明

```xml
<Declaration>
     <NamedIndividual IRI="John"/>
 </Declaration>
 <Declaration>
     <Class IRI="Person"/>
 </Declaration>
 <Declaration>
     <ObjectProperty IRI="hasWife"/>
 </Declaration>
 <Declaration>
     <DataProperty IRI="hasAge"/>
 </Declaration>
```

## 13 Appendix

```Manchester Syntax
Prefix: : <http://example.com/owl/families/>
Prefix: xsd: <http://www.w3.org/2001/XMLSchema#>
Prefix: owl: <http://www.w3.org/2002/07/owl#>
Prefix: otherOnt: <http://example.org/otherOntologies/families/>
Ontology: <http://example.com/owl/families>
Import: <http://example.org/otherOntologies/families.owl>

ObjectProperty: hasWife
  SubPropertyOf: hasSpouse
  Domain:        Man
  Range:         Woman
ObjectProperty: hasParent
  InverseOf: hasChild
ObjectProperty: hasSpouse
  Characteristics: Symmetric
ObjectProperty: hasChild
  Characteristics: Asymmetric
ObjectProperty: hasRelative
  Characteristics: Reflexive
ObjectProperty: parentOf
  Characteristics: Irreflexive
ObjectProperty: hasHusband
  Characteristics: Functional
  Characteristics: InverseFunctional
ObjectProperty: hasAncestor
  Characteristics: Transitive
ObjectProperty: hasGrandparent
  SubPropertyChain: hasParent o hasParent
ObjectProperty: hasUncle
  SubPropertyChain: hasFather o hasBrother
ObjectProperty: hasFather
  SubPropertyOf: hasParent
ObjectProperty: hasBrother
ObjectProperty: hasDaughter
ObjectProperty: hasSon
ObjectProperty: loves

DisjointProperties: hasParent, hasSpouse
DisjointProperties: hasSon,    hasDaughter
EquivalentProperties: hasChild, otherOnt:child
EquivalentProperties: hasAge,   otherOnt:age

DataProperty: hasAge
  Domain: Person
  Range:  xsd:nonNegativeInteger
  Characteristics: Functional
DataProperty: hasSSN

Datatype: personAge
  EquivalentTo: integer[<= 0 , >= 150]
Datatype: minorAge
  EquivalentTo: integer[<= 0 , >= 18]
Datatype: majorAge
   EquivalentTo: personAge and not minorAge
Datatype: toddlerAge
   EquivalentTo: { 1, 2 }
Datatype: minorAge

Class: Woman
  SubClassOf: Person
Class: Mother
  SubClassOf:   Woman
  EquivalentTo: Woman and Parent
Class: Person
  Annotations:  rdfs:comment "Represents the set of all people."
  EquivalentTo: Human
  HasKey: hasSSN
Class: Parent
  EquivalentTo: hasChild some Person
  EquivalentTo: Mother or Father
Class: ChildlessPerson
  EquivalentTo: Person and not Parent
  SubClassOf:   Person and not (inverse hasParent some owl:Thing)
Class: Grandfather
  SubClassOf: Man and Parent
Class: HappyPerson
  EquivalentTo: hasChild only Happy and hasChild some Happy
Class: JohnsChildren
  EquivalentTo: hasParent value John
Class: NarcisticPerson
  EquivalentTo: loves Self
Class: Orphan
  EquivalentTo: inverse hasChild only Dead
Class: Teenager
 SubClassOf: hasAge some integer[<= 13 , >= 19]
Class: Man
  SubClassOf: Annotations: rdfs:comment "States that every man is a person." Person
Class: MyBirthdayGuests
  EquivalentTo: { Bill, John, Mary }
Class: Father
  SubClassOf: Man and Parent
Class: X
  SubClassOf:   Parent and hasChild max 1 and hasChild only Female
  EquivalentTo: {Mary, Bill, Meg} and Female
Class: Adult
Class: Dead
Class: Father
Class: Female
Class: Happy
Class: Human
Class: SocialRole
Class: YoungChild

DisjointClasses: Mother, Father, YoungChild
DisjointClasses: Woman, Man
EquivalentClasses: Adult, otherOnt:Grownup

Individual: Mary
  Types: Person
  Types: Woman
Individual: Jack
  Types: Person and not Parent
Individual: John
  Types: Father
  Types: hasChild max 4 Parent
  Types: hasChild min 2 Parent
  Types: hasChild exactly 3 Parent
  Types: hasChild exactly 5
  Facts: hasAge "51"^^xsd:integer
  Facts: hasWife Mary
  DifferentFrom: Bill
Individual: Bill
  Facts: not hasWife     Mary
  Facts: not hasDaughter Susan
Individual: James
  SameAs: Jim
Individual: Jack
  Facts: not hasAge "53"^^xsd:integer
Individual: Father
 Types: SocialRole
Individual: Meg
Individual: Susan
Individual: Jim
Individual: otherOnt:JohnBrown
Individual: otherOnt:MaryBrown

SameIndividual: John, otherOnt:JohnBrown
SameIndividual: Mary, otherOnt:MaryBrown
```

```xml
<!DOCTYPE Ontology [
   <!ENTITY xsd "http://www.w3.org/2001/XMLSchema#" >
   <!ENTITY rdfs "http://www.w3.org/2000/01/rdf-schema#" >
]>

 <Ontology
   xml:base="http://example.com/owl/families/"
   ontologyIRI="http://example.com/owl/families"
   xmlns="http://www.w3.org/2002/07/owl#">
   <Prefix name="owl" IRI="http://www.w3.org/2002/07/owl#"/>
   <Prefix name="otherOnt" IRI="http://example.org/otherOntologies/families/"/>
   <Import>http://example.org/otherOntologies/families.owl</Import>

   <Declaration>
     <NamedIndividual IRI="John"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="Mary"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="Jim"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="James"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="Jack"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="Bill"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="Susan"/>
   </Declaration>
   <Declaration>
     <NamedIndividual IRI="Meg"/>
   </Declaration>

   <Declaration>
     <Class IRI="Person"/>
   </Declaration>
   <AnnotationAssertion>
     <AnnotationProperty IRI="&rdfs;comment"/>
     <IRI>Person</IRI>
     <Literal>Represents the set of all people.</Literal>
   </AnnotationAssertion>
   <Declaration>
     <Class IRI="Woman"/>
   </Declaration>
   <Declaration>
     <Class IRI="Parent"/>
   </Declaration>
   <Declaration>
     <Class IRI="Father"/>
   </Declaration>
   <Declaration>
     <Class IRI="Mother"/>
   </Declaration>
   <Declaration>
     <Class IRI="SocialRole"/>
   </Declaration>
   <Declaration>
     <Class IRI="Man"/>
   </Declaration>
   <Declaration>
     <Class IRI="Teenager"/>
   </Declaration>
   <Declaration>
     <Class IRI="ChildlessPerson"/>
   </Declaration>
   <Declaration>
     <Class IRI="Human"/>
   </Declaration>
   <Declaration>
     <Class IRI="Female"/>
   </Declaration>
   <Declaration>
     <Class IRI="HappyPerson"/>
   </Declaration>
   <Declaration>
     <Class IRI="JohnsChildren"/>
   </Declaration>
   <Declaration>
     <Class IRI="NarcisticPerson"/>
   </Declaration>
   <Declaration>
     <Class IRI="MyBirthdayGuests"/>
   </Declaration>
   <Declaration>
     <Class IRI="Dead"/>
   </Declaration>
   <Declaration>
     <Class IRI="Orphan"/>
   </Declaration>
   <Declaration>
     <Class IRI="Adult"/>
   </Declaration>
   <Declaration>
     <Class IRI="YoungChild"/>
   </Declaration>

   <Declaration>
     <ObjectProperty IRI="hasWife"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasChild"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasDaughter"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="loves"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasSpouse"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasGrandparent"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasParent"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasBrother"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasUncle"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasSon"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasAncestor"/>
   </Declaration>
   <Declaration>
     <ObjectProperty IRI="hasHusband"/>
   </Declaration>

   <Declaration>
     <DataProperty IRI="hasAge"/>
   </Declaration>
   <Declaration>
     <DataProperty IRI="hasSSN"/>
   </Declaration>

   <Declaration>
     <Datatype IRI="personAge"/>
   </Declaration>
   <Declaration>
     <Datatype IRI="minorAge"/>
   </Declaration>
   <Declaration>
     <Datatype IRI="majorAge"/>
   </Declaration>
   <Declaration>
     <Datatype IRI="toddlerAge"/>
   </Declaration>

   <DatatypeDefinition>
     <Datatype IRI="personAge"/>
     <DatatypeRestriction>
       <Datatype IRI="&xsd;integer"/>
       <FacetRestriction facet="&xsd;minInclusive">
         <Literal datatypeIRI="&xsd;integer">0</Literal>
       </FacetRestriction>
       <FacetRestriction facet="&xsd;maxInclusive">
         <Literal datatypeIRI="&xsd;integer">150</Literal>
       </FacetRestriction>
     </DatatypeRestriction>
   </DatatypeDefinition>
   <DatatypeDefinition>
     <Datatype IRI="minorAge"/>
     <DatatypeRestriction>
       <Datatype IRI="&xsd;integer"/>
       <FacetRestriction facet="&xsd;minInclusive">
         <Literal datatypeIRI="&xsd;integer">0</Literal>
       </FacetRestriction>
       <FacetRestriction facet="&xsd;maxInclusive">
         <Literal datatypeIRI="&xsd;integer">18</Literal>
       </FacetRestriction>
     </DatatypeRestriction>
   </DatatypeDefinition>
   <DatatypeDefinition>
     <Datatype IRI="majorAge"/>
     <DataIntersectionOf>
       <Datatype IRI="personAge"/>
       <DataComplementOf>
         <Datatype IRI="minorAge"/>
       </DataComplementOf>
     </DataIntersectionOf>
   </DatatypeDefinition>
   <DatatypeDefinition>
     <Datatype IRI="toddlerAge"/>
     <DataOneOf>
       <Literal datatypeIRI="&xsd;integer">1</Literal>
       <Literal datatypeIRI="&xsd;integer">2</Literal>
     </DataOneOf>
   </DatatypeDefinition>

   <SymmetricObjectProperty>
     <ObjectProperty IRI="hasSpouse"/>
   </SymmetricObjectProperty>
   <AsymmetricObjectProperty>
     <ObjectProperty IRI="hasChild"/>
   </AsymmetricObjectProperty>
   <DisjointObjectProperties>
     <ObjectProperty IRI="hasParent"/>
     <ObjectProperty IRI="hasSpouse"/>
   </DisjointObjectProperties>
   <ReflexiveObjectProperty>
     <ObjectProperty IRI="hasRelative"/>
   </ReflexiveObjectProperty>
   <IrreflexiveObjectProperty>
     <ObjectProperty IRI="parentOf"/>
   </IrreflexiveObjectProperty>
   <FunctionalObjectProperty>
     <ObjectProperty IRI="hasHusband"/>
   </FunctionalObjectProperty>
   <InverseFunctionalObjectProperty>
     <ObjectProperty IRI="hasHusband"/>
   </InverseFunctionalObjectProperty>
   <TransitiveObjectProperty>
     <ObjectProperty IRI="hasAncestor"/>
   </TransitiveObjectProperty>

   <ObjectPropertyDomain>
     <ObjectProperty IRI="hasWife"/>
     <Class IRI="Man"/>
   </ObjectPropertyDomain>
   <ObjectPropertyRange>
     <ObjectProperty IRI="hasWife"/>
     <Class IRI="Woman"/>
   </ObjectPropertyRange>

   <InverseObjectProperties>
     <ObjectProperty IRI="hasParent"/>
     <ObjectProperty IRI="hasChild"/>
   </InverseObjectProperties>

   <DisjointObjectProperties>
     <ObjectProperty IRI="hasSon"/>
     <ObjectProperty IRI="hasDaughter"/>
   </DisjointObjectProperties>

   <EquivalentObjectProperties>
     <ObjectProperty IRI="hasChild"/>
     <ObjectProperty abbreviatedIRI="otherOnt:child"/>
   </EquivalentObjectProperties>

   <SubObjectPropertyOf>
     <ObjectProperty IRI="hasWife"/>
     <ObjectProperty IRI="hasSpouse"/>
   </SubObjectPropertyOf>
   <SubObjectPropertyOf>
     <ObjectProperty IRI="hasFather"/>
     <ObjectProperty IRI="hasParent"/>
   </SubObjectPropertyOf>
   <SubObjectPropertyOf>
     <ObjectPropertyChain>
       <ObjectProperty IRI="hasParent"/>
       <ObjectProperty IRI="hasParent"/>
     </ObjectPropertyChain>
     <ObjectProperty IRI="hasGrandparent"/>
   </SubObjectPropertyOf>
   <SubObjectPropertyOf>
     <ObjectPropertyChain>
       <ObjectProperty IRI="hasFather"/>
       <ObjectProperty IRI="hasBrother"/>
     </ObjectPropertyChain>
     <ObjectProperty IRI="hasUncle"/>
   </SubObjectPropertyOf>
   <SubObjectPropertyOf>
     <ObjectPropertyChain>
       <ObjectProperty IRI="hasFather"/>
       <ObjectProperty IRI="hasBrother"/>
     </ObjectPropertyChain>
     <ObjectProperty IRI="hasUncle"/>
   </SubObjectPropertyOf>

   <HasKey>
     <Class IRI="Person"/>
     <DataProperty IRI="hasSSN"/>
   </HasKey>

   <DataPropertyDomain>
     <DataProperty IRI="hasAge"/>
     <Class IRI="Person"/>
   </DataPropertyDomain>
   <DataPropertyRange>
     <DataProperty IRI="hasAge"/>
     <Datatype IRI="&xsd;nonNegativeInteger"/>
   </DataPropertyRange>
   <FunctionalDataProperty>
     <DataProperty IRI="hasAge"/>
   </FunctionalDataProperty>
   <EquivalentDataProperties>
     <DataProperty IRI="hasAge"/>
     <DataProperty abbreviatedIRI="otherOnt:age"/>
   </EquivalentDataProperties>

   <SubClassOf>
     <Class IRI="Woman"/>
     <Class IRI="Person"/>
   </SubClassOf>
   <SubClassOf>
     <Class IRI="Mother"/>
     <Class IRI="Woman"/>
   </SubClassOf>
   <SubClassOf>
     <Class IRI="Grandfather"/>
     <ObjectIntersectionOf>
       <Class IRI="Man"/>
       <Class IRI="Parent"/>
     </ObjectIntersectionOf>
   </SubClassOf>
   <SubClassOf>
     <Class IRI="Father"/>
     <ObjectIntersectionOf>
       <Class IRI="Man"/>
       <Class IRI="Parent"/>
     </ObjectIntersectionOf>
   </SubClassOf>
   <SubClassOf>
     <Class IRI="ChildlessPerson"/>
     <ObjectIntersectionOf>
       <Class IRI="Person"/>
       <ObjectComplementOf>
         <ObjectSomeValuesFrom>
           <ObjectInverseOf>
             <ObjectProperty IRI="hasParent"/>
           </ObjectInverseOf>
           <Class abbreviatedIRI="owl:Thing"/>
         </ObjectSomeValuesFrom>
       </ObjectComplementOf>
     </ObjectIntersectionOf>
   </SubClassOf>
   <SubClassOf>
     <ObjectIntersectionOf>
       <ObjectOneOf>
         <NamedIndividual IRI="Mary"/>
         <NamedIndividual IRI="Bill"/>
         <NamedIndividual IRI="Meg"/>
       </ObjectOneOf>
       <Class IRI="Female"/>
     </ObjectIntersectionOf>
     <ObjectIntersectionOf>
       <Class IRI="Parent"/>
       <ObjectMaxCardinality cardinality="1">
         <ObjectProperty IRI="hasChild"/>
       </ObjectMaxCardinality>
       <ObjectAllValuesFrom>
         <ObjectProperty IRI="hasChild"/>
         <Class IRI="Female"/>
       </ObjectAllValuesFrom>
     </ObjectIntersectionOf>
   </SubClassOf>
   <SubClassOf>
     <Class IRI="Teenager"/>
     <DataSomeValuesFrom>
       <DataProperty IRI="hasAge"/>
       <DatatypeRestriction>
         <Datatype IRI="&xsd;integer"/>
         <FacetRestriction facet="&xsd;minExclusive">
           <Literal datatypeIRI="&xsd;integer">12</Literal>
         </FacetRestriction>
         <FacetRestriction facet="&xsd;maxInclusive">
           <Literal datatypeIRI="&xsd;integer">19</Literal>
         </FacetRestriction>
       </DatatypeRestriction>
     </DataSomeValuesFrom>
   </SubClassOf>
   <SubClassOf>
     <Annotation>
       <AnnotationProperty IRI="&rdfs;comment"/>
       <Literal datatypeIRI="&xsd;string">"States that every man is a person."</Literal>
     </Annotation>
     <Class IRI="Man"/>
     <Class IRI="Person"/>
   </SubClassOf>

   <EquivalentClasses>
     <Class IRI="HappyPerson"/>
     <ObjectIntersectionOf>
       <ObjectAllValuesFrom>
         <ObjectProperty IRI="hasChild"/>
         <Class IRI="HappyPerson"/>
       </ObjectAllValuesFrom>
       <ObjectSomeValuesFrom>
         <ObjectProperty IRI="hasChild"/>
         <Class IRI="HappyPerson"/>
       </ObjectSomeValuesFrom>
     </ObjectIntersectionOf>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="JohnsChildren"/>
     <ObjectHasValue>
       <ObjectProperty IRI="hasParent"/>
       <NamedIndividual IRI="John"/>
     </ObjectHasValue>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="NarcisticPerson"/>
     <ObjectHasSelf>
       <ObjectProperty IRI="loves"/>
     </ObjectHasSelf>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Orphan"/>
     <ObjectAllValuesFrom>
       <ObjectInverseOf>
         <ObjectProperty IRI="hasChild"/>
       </ObjectInverseOf>
       <Class IRI="Dead"/>
     </ObjectAllValuesFrom>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="MyBirthdayGuests"/>
     <ObjectOneOf>
       <NamedIndividual IRI="Bill"/>
       <NamedIndividual IRI="John"/>
       <NamedIndividual IRI="Mary"/>
     </ObjectOneOf>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Adult"/>
     <Class abbreviatedIRI="otherOnt:Grownup"/>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Parent"/>
     <ObjectSomeValuesFrom>
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="Person"/>
     </ObjectSomeValuesFrom>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Parent"/>
     <ObjectSomeValuesFrom>
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="Person"/>
     </ObjectSomeValuesFrom>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Person"/>
     <Class IRI="Human"/>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Mother"/>
     <ObjectIntersectionOf>
       <Class IRI="Woman"/>
       <Class IRI="Parent"/>
     </ObjectIntersectionOf>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="Parent"/>
     <ObjectUnionOf>
       <Class IRI="Mother"/>
       <Class IRI="Father"/>
     </ObjectUnionOf>
   </EquivalentClasses>
   <EquivalentClasses>
     <Class IRI="ChildlessPerson"/>
     <ObjectIntersectionOf>
       <Class IRI="Person"/>
       <ObjectComplementOf>
         <Class IRI="Parent"/>
       </ObjectComplementOf>
     </ObjectIntersectionOf>
   </EquivalentClasses>

   <DisjointClasses>
       <Class IRI="Woman"/>
       <Class IRI="Man"/>
   </DisjointClasses>
   <DisjointClasses>
     <Class IRI="Father"/>
     <Class IRI="Mother"/>
     <Class IRI="YoungChild"/>
   </DisjointClasses>

   <DifferentIndividuals>
     <NamedIndividual IRI="John"/>
     <NamedIndividual IRI="Bill"/>
   </DifferentIndividuals>

   <SameIndividual>
     <NamedIndividual IRI="James"/>
     <NamedIndividual IRI="Jim"/>
   </SameIndividual>
   <SameIndividual>
     <NamedIndividual IRI="John"/>
     <NamedIndividual abbreviatedIRI="otherOnt:JohnBrown"/>
   </SameIndividual>
   <SameIndividual>
     <NamedIndividual IRI="Mary"/>
     <NamedIndividual abbreviatedIRI="otherOnt:MaryBrown"/>
   </SameIndividual>

   <ObjectPropertyAssertion>
     <ObjectProperty IRI="hasWife"/>
     <NamedIndividual IRI="John"/>
     <NamedIndividual IRI="Mary"/>
   </ObjectPropertyAssertion>

   <DataPropertyAssertion>
     <DataProperty IRI="hasAge"/>
     <NamedIndividual IRI="John"/>
     <Literal datatypeIRI="&xsd;integer">51</Literal>
   </DataPropertyAssertion>

   <ClassAssertion>
       <Class IRI="Person"/>
       <NamedIndividual IRI="Mary"/>
   </ClassAssertion>
   <ClassAssertion>
       <Class IRI="Woman"/>
       <NamedIndividual IRI="Mary"/>
   </ClassAssertion>
   <ClassAssertion>
     <ObjectIntersectionOf>
       <Class IRI="Person"/>
       <ObjectComplementOf>
         <Class IRI="Parent"/>
       </ObjectComplementOf>
     </ObjectIntersectionOf>
     <NamedIndividual IRI="Jack"/>
   </ClassAssertion>

   <ClassAssertion>
     <ObjectMaxCardinality cardinality="4">
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="Parent"/>
     </ObjectMaxCardinality>
     <NamedIndividual IRI="John"/>
   </ClassAssertion>
   <ClassAssertion>
     <ObjectMinCardinality cardinality="2">
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="Parent"/>
     </ObjectMinCardinality>
     <NamedIndividual IRI="John"/>
   </ClassAssertion>
   <ClassAssertion>
     <ObjectExactCardinality cardinality="3">
       <ObjectProperty IRI="hasChild"/>
       <Class IRI="Parent"/>
     </ObjectExactCardinality>
     <NamedIndividual IRI="John"/>
   </ClassAssertion>
   <ClassAssertion>
     <ObjectExactCardinality cardinality="5">
       <ObjectProperty IRI="hasChild"/>
     </ObjectExactCardinality>
     <NamedIndividual IRI="John"/>
   </ClassAssertion>
   <ClassAssertion>
     <Class IRI="Father"/>
     <NamedIndividual IRI="John"/>
   </ClassAssertion>

   <ClassAssertion>
     <Class IRI="SocialRole"/>
     <NamedIndividual IRI="Father"/>
   </ClassAssertion>

   <NegativeObjectPropertyAssertion>
     <ObjectProperty IRI="hasWife"/>
     <NamedIndividual IRI="Bill"/>
     <NamedIndividual IRI="Mary"/>
   </NegativeObjectPropertyAssertion>
   <NegativeDataPropertyAssertion>
     <DataProperty IRI="hasAge"/>
     <NamedIndividual IRI="Jack"/>
     <Literal datatypeIRI="&xsd;integer">53</Literal>
   </NegativeDataPropertyAssertion>
   <NegativeObjectPropertyAssertion>
     <ObjectProperty IRI="hasDaughter"/>
     <NamedIndividual IRI="Bill"/>
     <NamedIndividual IRI="Susan"/>
   </NegativeObjectPropertyAssertion>

 </Ontology>
```
