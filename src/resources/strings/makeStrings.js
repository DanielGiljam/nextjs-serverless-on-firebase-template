import fetch from "isomorphic-unfetch"

async function makeStrings(lang) {
  const en = await stringsFetcher("en")
  if (/^en-/.test(lang)) return en
  if (/^sv-/.test(lang)) lang = "sv"
  if (/^fi-/.test(lang)) lang = "fi"
  const stringResources = await stringsFetcher(lang)
  return mergeResources(en, stringResources, "stringResources")
}

async function stringsFetcher(lang) {
  return await fetch(
      `${process.env.ASSET_PREFIX}/string-resources/${lang}.json`,
  )
      .then((res) => res.json())
      .catch(() => {
        console.error(`Failed to fetch string resources for "${lang}".`)
        return {}
      })
}

function mergeResources(fallbackResources, resources, setName) {
  checkForObjectProperties(fallbackResources, resources, setName)
  mergeOtherProperties(fallbackResources, resources, setName)
  return resources
}

function checkForObjectProperties(
    fallbackObject,
    targetObject,
    structureSoFar,
) {
  for (const key in fallbackObject) {
    // Looking for properties that are objects
    if (
      fallbackObject.hasOwnProperty(key) &&
      typeof fallbackObject[key] === "object"
    ) {
      const newFBO = fallbackObject[key]
      const newStructureSoFar = updateStructureSoFar(structureSoFar, key)
      if (targetObject.hasOwnProperty(key)) {
        // Making sure the target object's corresponding property also is an object, else logs error telling about structural difference
        const newOBJ = targetObject[key]
        if (typeof newOBJ === "object") {
          checkForObjectProperties(newFBO, newOBJ, newStructureSoFar)
          mergeOtherProperties(newFBO, newOBJ, newStructureSoFar)
        } else {
          const error = new Error(
              getStructureDifferenceErrorMessage(
                  fallbackObject,
                  targetObject,
                  key,
              ),
          )
          console.warn(error.stack)
          // If a structural difference is detected between the target object and the fallback object
          // then difference is eliminated by the fallback object overwriting the involved properties in the target object
          // as the assumption goes that the fallbackObject is the "right" one and the target object has to comply to its structure
          logFallbackForObject(newStructureSoFar)
          targetObject[key] = newFBO
        }
      } else {
        // If the target object's property is missing, then assigning the fallback object's corresponding property to the target object
        logFallbackForObject(newStructureSoFar)
        targetObject[key] = newFBO
      }
    }
  }
}

function mergeOtherProperties(fallbackObject, targetObject, structureSoFar) {
  for (const key in fallbackObject) {
    // Looking for properties that aren't objects
    if (
      fallbackObject.hasOwnProperty(key) &&
      typeof fallbackObject[key] !== "object"
    ) {
      const fallbackProperty = fallbackObject[key]
      const newStructureSoFar = updateStructureSoFar(structureSoFar, key)
      if (targetObject.hasOwnProperty(key)) {
        // Making sure that mutual properties are of the same type, else logs error telling about structural difference
        const prop = targetObject[key]
        if (!(typeof fallbackProperty === typeof prop)) {
          console.warn(
              getStructureDifferenceErrorMessage(
                  fallbackObject,
                  targetObject,
                  key,
              ),
          )
          // If a structural difference is detected between the target object and the fallback object
          // then difference is eliminated by the fallback object overwriting the involved properties in the target object
          // as the assumption goes that the fallbackObject is the "right" one and the target object has to comply to its structure
          logFallback(fallbackProperty, newStructureSoFar)
          targetObject[key] = fallbackProperty
        }
      } else {
        // If the target object's property is missing, assigning the fallback object's corresponding property to the target object
        logFallback(fallbackProperty, newStructureSoFar)
        targetObject[key] = fallbackProperty
      }
    }
  }
}

function updateStructureSoFar(structureSoFar, key) {
  return `${structureSoFar}.${key}`
}

function getStructureDifferenceErrorMessage(fallbackObject, targetObject, key) {
  return `Requested resource set and fallback set differ in structure! Fallback set's property \`${key}\` of type \`${typeof fallbackObject[
      key
  ]}\` is of type \`${typeof targetObject[key]}\` in requested set.`
}

function logFallback(fallbackProperty, structureSoFar) {
  console.warn(
      `Falling back to "${fallbackProperty}" with property \`${structureSoFar}\``,
  )
}

function logFallbackForObject(structureSoFar) {
  console.warn(`Falling back with object property \`${structureSoFar}\``)
}

export default makeStrings
