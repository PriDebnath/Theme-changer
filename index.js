 
    let themeList = [
      {
        selected: false,
        canDelete: false,
        textColor: '#686868',
        primaryColor: '#31DFFF',
        secondaryColor: '#98EFFF',
        backgroundColor: '#DCF9FF',
        headerBackgroundColor: '#B8F4FF',
      }
  ,
      {
        selected: true,
        canDelete: false,
        textColor: '#686868',
        primaryColor: '#FF6347', // Tomato
        secondaryColor: '#FFD700', // Gold
        backgroundColor: '#FFEBCD', // Moccasin
        headerBackgroundColor: '#FFA07A', // Light Salmon
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#7CFC00', // Lawn Green
        secondaryColor: '#32CD32', // Lime Green
        backgroundColor: '#98FB98', // Pale Green
        headerBackgroundColor: '#00FF7F', // Spring Green
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#9932CC', // Dark Orchid
        secondaryColor: '#8A2BE2', // Blue Violet
        backgroundColor: '#E6E6FA', // Lavender
        headerBackgroundColor: '#DDA0DD', // Plum
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#4682B4', // Steel Blue
        secondaryColor: '#87CEEB', // Sky Blue
        backgroundColor: '#B0E0E6', // Powder Blue
        headerBackgroundColor: '#ADD8E6', // Light Blue
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#2E8B57', // Sea Green
        secondaryColor: '#20B2AA', // Light Sea Green
        backgroundColor: '#66CDAA', // Medium Aquamarine
        headerBackgroundColor: '#3CB371', // Medium Sea Green
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#FF4500', // Orange Red
        secondaryColor: '#FFA500', // Orange
        backgroundColor: '#FFDAB9', // Peach Puff
        headerBackgroundColor: '#FF8C00', // Dark Orange
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#8B4513', // Saddle Brown
        secondaryColor: '#A52A2A', // Brown
        backgroundColor: '#D2B48C', // Tan
        headerBackgroundColor: '#CD853F', // Peru
  },
      {
        selected: false,
        canDelete: true,
        textColor: '#686868',
        primaryColor: '#4B0082', // Indigo
        secondaryColor: '#8A2BE2', // Blue Violet
        backgroundColor: '#9370DB', // Medium Purple
        headerBackgroundColor: '#800080', // Purple
  },
];


    let themeBox = document.getElementById('themeBox')

    // get stored colors

    let storedThemeList = getStoredThemeList()

    if (!storedThemeList) {
      // if there is no stored theme use hardcoded theme list to start with
      storedThemeList = themeList
    } else {
      themeList = storedThemeList
    }

    // show selected theme after few seconds
    themeList.map((theme, index) => {
      if (theme.selected) {
        setTimeout(() => {
          handleApplyButton(theme, index)
        }, 2000)
      }
    })

    let newTheme = {}


    // handle local storage start

    function storeThemeListInLocalStorage(themeList) {
      localStorage.setItem("themeList", JSON.stringify(themeList))

    }

    function getStoredThemeList() {
      return JSON.parse(localStorage.getItem("themeList"))
    }

    // handle local storage end






    function displayThemeList(themeList) {

      themeBox.innerHTML = ''
      themeList.map((theme, index) => {

        let div = document.createElement('div')
        let primaryColorDiv = document.createElement('div')

        let secondaryColorDiv = document.createElement('div')
        let headerBackgroundColorDiv = document.createElement('div')

        let backgroundColorDiv = document.createElement('div')

        let actionContainer = document.createElement('div')
        let applyThemeButton = document.createElement('button')
        let deleteThemeButton = document.createElement('button')

        // styles

        // parent div

        if (theme.selected) {
          div.style.borderWidth = '4px'
        } else {
          div.style.borderWidth = '1px'
        }

        div.style.display = "flex"
        div.style.height = "5rem"
        div.style.margin = "1rem"

        div.style.borderStyle = 'solid'

        div.style.borderColor = theme.primaryColor

        div.style.borderRadius = '0.3rem';


        // primary 
        primaryColorDiv.style.background = theme.primaryColor
        primaryColorDiv.style.width = "100%"

        primaryColorDiv.style.background = theme.primaryColor

        // secondary
        secondaryColorDiv.style.width = "100%"
        secondaryColorDiv.style.background = theme.secondaryColor


        // header
        headerBackgroundColorDiv.style.width = "100%"
        headerBackgroundColorDiv.style.background = theme.headerBackgroundColor


        // background
        backgroundColorDiv.style.width = "100%"
        backgroundColorDiv.style.background = theme.backgroundColor



        // actionContainer

        actionContainer.style.padding = '0.5rem'
        actionContainer.style.display = 'flex'
        actionContainer.style.flexDirection = 'column'
        actionContainer.style.justifyContent = 'space-around'

        // apply button
        applyThemeButton.textContent = 'Apply Theme'
        applyThemeButton.style.background = theme.primaryColor

        applyThemeButton.addEventListener('click', () => handleApplyButton(theme, index))

        // delete theme button 
        deleteThemeButton.textContent = 'Delete Theme'
        deleteThemeButton.style.background = theme.secondaryColor
        deleteThemeButton.style.color = theme.textColor
        deleteThemeButton.disabled = !(theme.canDelete)


        deleteThemeButton.addEventListener('click', () => handleDeleteButton(theme, index))

        // appending to document

        div.appendChild(primaryColorDiv)
        div.appendChild(secondaryColorDiv)
        div.appendChild(headerBackgroundColorDiv)
        div.appendChild(backgroundColorDiv)


        // put action button in action container
        actionContainer.appendChild(applyThemeButton)
        actionContainer.appendChild(deleteThemeButton)
        div.appendChild(actionContainer)

        themeBox.appendChild(div)
      })
    }


    displayThemeList(themeList)


    function handleChangeColor(event) {
      newTheme[event?.target?.name] = event.target.value || 'black'
    }

    // handle action buttons start

    function handleAddTheme() {
      if (Object.keys(newTheme).length) {
        let theme = JSON.parse(JSON.stringify(newTheme)) // create a different copy so that it doesn't override existing instance
        themeList.unshift({
          ...theme,
          canDelete: true,
          selected: false

        })
      }

      storeThemeListInLocalStorage(themeList)
      displayThemeList(themeList)
    }



    function handleApplyButton(theme, index) {

      themeList = themeList.map((theme, i) => {
        if (index == i) {
          return {
            ...theme,
            selected: true
          }
        }
        else {
          return {
            ...theme,
            selected: false
          }
        }
      })

      displayThemeList(themeList)
      storeThemeListInLocalStorage(themeList)

      document.documentElement.style.setProperty('--textColor', theme.textColor)

      document.documentElement.style.setProperty('--primaryColor', theme.primaryColor)

      document.documentElement.style.setProperty('--secondaryColor', theme.secondaryColor)

      document.documentElement.style.setProperty('--headerBackgroundColor', theme.headerBackgroundColor)

      document.documentElement.style.setProperty('--backgroundColor', theme.backgroundColor)

    }

    function handleDeleteButton(theme, index) {

      themeList.splice(index, 1)
      storeThemeListInLocalStorage(themeList)

      displayThemeList(themeList)
    }


    // handle action buttons end
 
