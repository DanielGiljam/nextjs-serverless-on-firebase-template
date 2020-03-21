import {MouseEvent} from "react"

import Typography from "@material-ui/core/Typography"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"

import useGlobalAppState from "nextjs-global-app-state-strict-demo/useGlobalAppState"
import useStrings from "nextjs-global-app-state-strict-demo/useStrings"

function Lang(): JSX.Element {
  const strings = useStrings().header.preferences.lang
  const {lang, languages, setLang, cookieConsent} = useGlobalAppState()
  function onChange(_event: MouseEvent<HTMLElement>, value: string): void {
    if (value) {
      setLang(value)
    } else {
      setLang(lang)
    }
  }
  return (
    <li>
      <Typography
        color={cookieConsent ? "textPrimary" : "textSecondary"}
        component={"label"}
        id={"language"}
        variant={"body1"}
      >
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
            disabled={!cookieConsent}
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
