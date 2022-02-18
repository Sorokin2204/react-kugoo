const connectionsSchema = `

type Category_Attribute_Connection {
  edges: [Category_Attribute_Edge]
}

type Category_Attribute_Edge {
  node: Attribute
}

type Category_Spec_Connection {
  edges: [Category_Spec_Edge]
}

type Category_Spec_Edge {
  node: Spec
}


type Product_SpecOption_Connection {
  edges: [Product_SpecOption_Edge]
}
type Product_SpecOption_Edge {
  node: SpecOption
}

`;
module.exports = { connectionsSchema };
