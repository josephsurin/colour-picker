import tinycolor from 'tinycolor2'

/* A scheme generator function is a function that takes in a seed colour (rgb) and returns its name and an array of colours (hexstring) as a size-2 array */

const byBrightness = (a, b) => b.getBrightness() - a.getBrightness()
const byHue = (a, b) => b._h - a._h
const toHexString = x => x.toHexString()

const tc_generator = (seed, name, sortMethod) => {
    var scheme = tinycolor(seed)[name]()
        .sort(sortMethod || byBrightness)
        .map(toHexString)
    return [name, scheme]
}

const monochromatic = (seed) => tc_generator(seed, 'monochromatic')
const analogous = (seed) => tc_generator(seed, 'analogous', byHue)
const splitcomplement = (seed) => tc_generator(seed, 'splitcomplement')
const triad = (seed) => tc_generator(seed, 'triad')
const tetrad = (seed) => tc_generator(seed, 'tetrad')
function circular(seed) {
    var scheme = [tinycolor(seed)]
    let { h, s, v } = tinycolor(seed).toHsv()
    var sc = 100*s - 50
    var vc = 100*v - 50
    var hueshifts = [-15, -20, -35, 15, 20, 35]
    var mods = [[-10, 0],[-20, -5], [-35, -10],[0, -10],[-5, -20],[-10, -35]]
    var modpoints = [mods] // 1st quadrant
    modpoints.push(mods.map(el => [-el[0], el[1]])) // 2nd quadrant
    modpoints.push(modpoints[1].map(el => [el[0], -el[1]])) // 3rd quadrant
    modpoints.push(mods.map(el => [el[0], -el[1]])) // 4th quadrant
    var quadrant = 0
    if(sc < 0 && vc > 0) {
        quadrant = 1
    } else if(sc < 0 && vc < 0) {
        quadrant = 2
    } else if(sc > 0 && vc < 0) {
        quadrant = 3
    }
    modpoints[quadrant].forEach(([sm, vm], i) => {
        var hn = (h + hueshifts[i]) % 361
        if(hn < 0) {
            hn += 360
        }
        var sn = (100*s + sm) / 100
        var vn = (100*v + vm) / 100
        scheme.push(tinycolor({ h: hn, s: sn, v: vn }))
    })
    scheme = scheme.sort(byBrightness).map(toHexString)
    return ['circular', scheme]
}

export const schemeGenerators = [monochromatic, analogous, splitcomplement, triad, tetrad, circular]
