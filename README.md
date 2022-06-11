# Interactive Comments Section

## Table of contents

- [Interactive Comments Section](#interactive-comments-section)
  - [Table of contents](#table-of-contents)
  - [Overview](#overview)
    - [Screenshot](#screenshot)
    - [Links](#links)
  - [Process](#process)
    - [Built with](#built-with)
    - [Note](#note)
      - [Redux Toolkit Slice](#redux-toolkit-slice)
      - [Framer, the animaton helper](#framer-the-animaton-helper)
    - [Continued development](#continued-development)
    - [Useful resources](#useful-resources)
  - [Author](#author)
  - [Acknowledgement](#acknowledgement)

## Overview

### Screenshot

![Preview](./design/desktop-preview.jpg)

### Links

- [Heroku](https://interactive-comments-ericsen.herokuapp.com)

## Process

### Built with

- Frontend
  - Sass
  - React
  - Redux Toolkit
  - Framer
  - Webpack
- Backend
  - json-server

### Note

#### Redux Toolkit Slice

> RTK is enable to manage action and reducer in one file.
> Conventionally, this file is called "slice" (which is pretty straight forward since this api is createSlice).
> However, if you want to create middleware like thunk, it need to be seperate to another file called "service".

```js
// import this createSlice api
import { createSlice } from "@reduxjs/toolkit"
// import async thunk to fetch the user
import { fetchCurrentUser } from "./authService"

const initialState = {
  isAuthenticated: false,
  user: {},
  isLoading: false,
  error: { isError: false, errMsg: "" },
}

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // the reducer don't take any data fetching
    clearAuthError: (state) => {
      state.error.isError = false
      state.error.errMsg = ""
    },
  },
  extraReducers: (builder) => {
    builder
    // Here is the interesting part, we could get the current status of async thunk 
    // action, which make state controll more easier.
    // Note: use "addCase" to single async thunk status matching, and 
    // "addMatcher" for multiple. You could see that in another "commentSlice" file.
      .addCase(fetchCurrentUser.pending, (state) => {
        state.isLoading = true
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.isLoading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchCurrentUser.rejected, (state) => {
        state.isLoading = false
        state.isAuthenticated = false
        state.user = {}
        state.error.isError = true
        state.error.errMsg = "Can't fetch the user"
      })
  },
})

// export the action directly
// Note: async action are exported in the service file
export const { clearAuthError } = authSlice.actions

// export the wanted state
export const selectUser = (state) => state.auth.user
export const selectAuthError = (state) => state.auth.error

// export the reducer, which need to be include in the store
export default authSlice.reducer
```

#### Framer, the animaton helper

> Framer provides a lot of apis to make the animation come true.
> For the quick start, you only need to add tag with motion before it. (ex: div > motion.div)
> And it could be fed by many animation attributes like initial, animate, exit, transition.

```js
/*
exit attribute is for animation before this div being destroyed. 
Note: This is pretty important that you should wrap it with <AnimationPresence> Tag. 
Another note: When I say "destroyed", it is just like this kind of condition >> 
  {isOpen && <Popup />}
 which is use isOpen to control the element is render or not.
*/

<motion.div className="popup__bg" exit={{ opacity: 0 }}>
  // initial: state when this element was first render.
  // animate: state of element when the animation is over.
  // transition: with duration (which is same as animation attribute in CSS), type (type of this animation should present) and bounce (bounce effect duration, which is very useful to add some cute animated object)
  <motion.div
    className="popup"
    initial={{ x: -200, y: -50, scale: 0.5 }}
    animate={{ x: -200, y: -100, scale: 1 }}
    exit={{ opacity: 0, scale: 0.1 }}
    transition={{ type: "spring", duration: 0.3, bounce: 0.5 }}
  >
    {/*Popup contents*/}
  </motion.div>
</motion.div>
```

### Continued development

- [ ] Seperate more reusable components out from Card.js and UserCard.js.
- [ ] Rename the components in comment folder.
- [ ] Construct the backend by apollo server.

### Useful resources

- [Log Rocket Blog](https://blog.logrocket.com) - Many useful blogs and high quality content. Get the solution of deploying monorepo on Heroku from "https://blog.logrocket.com/deploying-decoupled-monorepo-project-heroku/" and examples of framer from "https://blog.logrocket.com/framer-motion-tutorial/"

## Author

- GitHub - [Ericsen Tsai](https://github.com/ericsen-tsai)

## Acknowledgement

- 💡 Glyn Lewington
- 💡 Doğacan Bilgili
- 💡 Shawn D'silva
