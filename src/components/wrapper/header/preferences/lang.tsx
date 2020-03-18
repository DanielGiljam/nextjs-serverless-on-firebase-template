import Typography from "@material-ui/core/Typography"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"
import ToggleButton from "@material-ui/lab/ToggleButton"

import useStrings from "nextjs-global-app-state/useStrings"
import useGlobalAppState from "nextjs-global-app-state/useGlobalAppState"

function Lang(): JSX.Element {
  const strings = useStrings().header.preferences.lang
  const {lang, languages, setLang} = useGlobalAppState()
  function onChange(_event: any, value: any) {
    console.log(_event)
    if (value) setLang(value)
  }
  return (
    <li>
      <Typography component={"label"} id={"language"} variant={"body1"}>
        {strings.label}
      </Typography>
      <ToggleButtonGroup
        aria-labelledby={"language"}
        value={lang}
        exclusive
        onChange={onChange}
      >
        {Array.from(languages).map((lang) => (
          <ToggleButton
            key={lang as string}
            aria-label={lang as string}
            value={lang}
          >
            {strings.option[lang as string]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </li>
  )
}

export default Lang
