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

export const schemeGenerators = [monochromatic, analogous, splitcomplement, triad, tetrad]
