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
    // console.log('index', findAttr);

    // console.log(attrName);

    // const existArrIndex = groupArray.find(
    //   (groupAttr) => groupAttr.name === attrName,
    // );
    // console.log(existArrIndex);

    // if (existArrIndex !== -1) {
    //   groupArray[existArrIndex].attrOpts.push(attr);
    // } else {
    //   groupArray.push({ name: attrName, attrOpts: [{ ...attr }] });
    // }
    // const attrName = currentValue.node.Attribute.name;
    // const findAttr = acc.find((at) => at.name === attrName);

    // if (!acc[currentValue[criteria]]) {
    //   acc[currentValue[criteria]] = [];
    // }
    // acc[currentValue[criteria]].push(currentValue);
  });
  return groupArray;
}
