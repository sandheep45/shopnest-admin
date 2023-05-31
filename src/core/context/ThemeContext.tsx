import * as React from "react"

const initialState = {
  isDarkTheme: false,
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setIsDarkTheme: () => {},
}

interface IContext {
  isDarkTheme: boolean
  setIsDarkTheme: React.Dispatch<React.SetStateAction<boolean>>
}

const ThemeContext = React.createContext<IContext>(initialState)

const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [isDarkTheme, setIsDarkTheme] = React.useState(true)
  const themeContextObj = React.useMemo(
    () => ({
      isDarkTheme: isDarkTheme,
      setIsDarkTheme: setIsDarkTheme,
    }),
    [isDarkTheme]
  )

  React.useEffect(() => {
    const isDarkTheme = localStorage.getItem("isDarkTheme")
    if (isDarkTheme) {
      setIsDarkTheme(isDarkTheme === "true")
    }
  }, [isDarkTheme])

  return <ThemeContext.Provider value={themeContextObj}>{children}</ThemeContext.Provider>
}

// hook for using context
export const useThemeContext = () => React.useContext(ThemeContext)

export default ThemeContextProvider
