const wangnishi = ((Nums) => {
	const numsReversed = Object.keys(Nums).map(x => +x).filter(x => x > 0)
	const getMinDiv = (num) => {
		for (let i = numsReversed.length; i >= 0; i--)
			if (num >= numsReversed[i])
				return numsReversed[i]
	}
	const isDotRegex = /\.(\d+?)0{0,}$/
	const demolish = (num) => {
		if (typeof num !== "number")
			return ""

		if (num === Infinity || Number.isNaN(num))
			return `这么恶臭的${num}有必要论证吗`

		if (num < 0)
			return `(⑨)*(${demolish(num * -1)})`.replace(/\*\(1\)/g, "")

		if (!Number.isInteger(num)) {
			// abs(num) is definitely smaller than 2**51
			// rescale
			const n = num.toFixed(16).match(isDotRegex)[1].length
			return `(${demolish(num * Math.pow(10, n))})/(10)^(${n})`
		}

		if (Nums[num])
			return String(num)

		const div = getMinDiv(num)
		return (`${div}*(${demolish(Math.floor(num / div))})+` +
			`(${demolish(num % div)})`).replace(/\*\(1\)|\+\(0\)$/g, "")
	}
	//Finisher
	const finisher = (expr) => {
		expr = expr.replace(/\d+|⑨/g, (n) => Nums[n]).replace("^", "**")
		//As long as it matches ([\*|\/])\(([^\+\-\(\)]+)\), replace it with $1$2
		while (expr.match(/[\*|\/]\([^\+\-\(\)]+\)/))
			expr = expr.replace(/([\*|\/])\(([^\+\-\(\)]+)\)/, (m, $1, $2) => $1 + $2)
		//As long as it matches ([\+|\-])\(([^\(\)]+)\)([\+|\-|\)]), replace it with $1$2$3
		while (expr.match(/[\+|\-]\([^\(\)]+\)[\+|\-|\)]/))
			expr = expr.replace(/([\+|\-])\(([^\(\)]+)\)([\+|\-|\)])/, (m, $1, $2, $3) => $1 + $2 + $3)
		//As long as it matches ([\+|\-])\(([^\(\)]+)\)$, replace it with $1$2
		while (expr.match(/[\+|\-]\(([^\(\)]+)\)$/))
			expr = expr.replace(/([\+|\-])\(([^\(\)]+)\)$/, (m, $1, $2) => $1 + $2)
		//If there is a bracket in the outermost part, remove it
		if (expr.match(/^\([^\(\)]+?\)$/))
			expr = expr.replace(/^\(([^\(\)]+)\)$/, "$1")

		expr = expr.replace(/\+-/g,'-')
		return expr
	}
	return (num) => finisher(demolish(num))
})({
	1919124: "1919124",
	1742684: "191*9124",
	919124: "1*919124",
	767648: "191912*4",
	460584: "19191*24",
	363356: "19*19124",
	237956: "1919*124",
	191908: "191912-4",
	92112: "1919*12*4",
	47978: "191912/4",
	12797: "191*(91-24)",
	5757: "1919*12/4",
	3056: "191*(9+1+2+4)",
	1919: "1919*(-1-2+4)",
	1083: "19*19*(1-2+4)",
	573: "191*(9*1-2-4)",
	102: "191-91-2+4",
	50:"(19*1-9)*(-1+2+4)",
	10: "(1+9+1-9)*(-1+2+4)",
	5: "(19-19)-((1-2)-4)",
	4: "(19-19)-((1-2)*4)",
	3: "(19-19)+(12/4)",
	2: "(19-19)+(-1*2+4)",
	1: "(19-19)-1-2+4",
	0: "(19-19)*124",
})

if (typeof module === 'object' && module.exports)
	module.exports = wangnishi

