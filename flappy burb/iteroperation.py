def opMap(i, opStr, n):
    return {
        "+" : lambda a,b : [item + n for item in i],
        "-" : lambda a,b : [item - n for item in i],
        "!-" : lambda a,b : [n - item for item in i],
        "*" : lambda a,b : [item * n for item in i],
        "/" : lambda a,b : [item / n for item in i],
        "!/" : lambda a,b : [n / item for item in i],
        "//" : lambda a,b : [item // n for item in i],
        "!//" : lambda a,b : [n // item for item in i],
        "^" : lambda a,b : [item ^ n for item in i],
        "!^" : lambda a,b : [n ^ item for item in i],
        "%" : lambda a,b : [item % n for item in i],
        "!%" : lambda a,b : [n % item for item in i]
    }[opStr](i, n)

def iterOp(i1, opStr, i2):
    return {
        "+" : lambda a,b : [a[i] + n for i,n in enumerate(b)],
        "-" : lambda a,b : [a[i] - n for i,n in enumerate(b)],
        "*" : lambda a,b : [a[i] * n for i,n in enumerate(b)],
        "/" : lambda a,b : [a[i] / n for i,n in enumerate(b)],
        "//" : lambda a,b : [a[i] // n for i,n in enumerate(b)],
        "^" : lambda a,b : [a[i] ^ n for i,n in enumerate(b)],
        "%" : lambda a,b : [a[i] % n for i,n in enumerate(b)]
    }[opStr](i1, i2)

def setOp(i1, opStr, i2):
    s1 = set(i1)
    s2 = set(i2)
    return list({
        "|" : lambda a,b : s1 | s2,
        "&" : lambda a,b : s1 & s2,
        "-" : lambda a,b : s1 - s2,
        "^" : lambda a,b : s1 ^ s2
    }[opStr](s1, s2))