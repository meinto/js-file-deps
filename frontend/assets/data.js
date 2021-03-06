var nodeIDs = []
var edgeIDs = []

var g = {
  nodes: rawData.map((n, i) => {
    nodeIDs.push(n.id)
    n.color = "#333"
    n.size = 1
    n.x = Math.sin(i * 0.1) * positionMultiplyer
    n.y = Math.cos(i * 0.1) * positionMultiplyer
    return n
  }),
  edges: rawData.reduce((all, curr) => {

    if (!curr.imports) {
      return all
    }

    var imports = curr.imports
      .filter(i => nodeIDs.indexOf(i.id) > -1)
      .filter(i => {
        var eID = curr.id + i.id
        var go = edgeIDs.indexOf(eID) < 0
        edgeIDs.push(eID)
        return go
      })
      .map(i => {
        var eID = curr.id + i.id
        return {
          id: eID,
          source: curr.id,
          target: i.id,
        }
      })

    return [
      ...all,
      ...imports,
    ]

  }, [])
}

console.log(g)
