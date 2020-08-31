<<<<<<< HEAD
1. Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`, so if there are children, then yes.
2. No, wrong, because `elem.children[0]` is the first child among elements. But there may be non-element nodes before it. So `previousSibling` may be a text node.
=======
1. Yes, true. The element `elem.lastChild` is always the last one, it has no `nextSibling`.
2. No, wrong, because `elem.children[0]` is the first child *among elements*. But there may exist non-element nodes before it. So `previousSibling` may be a text node.
>>>>>>> f830bc5d9454d85829e011d914f215eb5896579a

Please note that for both cases if there are no children, then there will be an error. For instance, if `elem.lastChild` is `null`, we can't access `elem.lastChild.nextSibling`.
