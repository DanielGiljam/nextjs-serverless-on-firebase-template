import Typography from "@material-ui/core/Typography"
import ToggleButton from "@material-ui/lab/ToggleButton"
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup"

import useStrings from "nextjs-global-app-state/useStrings"
import useGlobalAppState from "nextjs-global-app-state/useGlobalAppState"

function Theme(): JSX.Element {
  const strings = useStrings().header.preferences.theme
  const {theme, themes, setTheme} = useGlobalAppState()
  return (
    <li>
      <Typography component={"label"} id={"theme"} variant={"body1"}>
        {strings.label}
      </Typography>
      <ToggleButtonGroup
        aria-labelledby={"theme"}
        value={theme}
        exclusive
        onChange={(_event, value): void => setTheme(value)}
      >
        {Array.from(themes).map((theme) => (
          <ToggleButton
            key={theme as string}
            aria-label={theme as string}
            value={theme}
          >
            {strings.option[theme as string]}
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
    </li>
  )
}

export default Theme
