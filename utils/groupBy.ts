export function groupBy(arr) {
  let groupArray = [];
  arr.map((attr) => {
    let attrName = attr.node.Attribute.name;
    let findAttr = groupArray.findIndex((grp) => grp.name === attrName);
    const {
      node: { Attribute, ...restAttr },
      ...restAttrCustom
    } = attr;
    const attrOpt = { ...restAttr, ...restAttrCustom };
    if (findAttr === -1) {
      groupArray.push({
        ...Attribute,
        attrOpts: [attrOpt],
      });
    } else {
      groupArray[findAttr].attrOpts.push(attrOpt);
    }
  });
  return groupArray;
}
