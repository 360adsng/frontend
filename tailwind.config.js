/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      //for colors
      colors:{
        ads360yellow:{
          100:'#D0B301',
        },
        ads360yellowBtn:{
          100:'#F6D935',
        },
        ads360black:{
          50: '#3e3e3e80',
          100:'#292728',
        },
        ads360light:{
          100:"#F9F9F9",
        },
        ads360:{
          hash:"#F2F2F2",
        },
        ads360gray:{
          100:"#C5C4C5",
        },
      },

      //for screens
      'big-md':{'min':'850px', 'max':'1023px'},
      'big-sm':{'min':'459px', 'max':'767px'},


      //for animation
      animation: {
        move: "move 0.5s ease-in forwards",
        changeColor:"changeColor 0.1s ease-in forwards",
        changeColor2:"changeColor2 0.1s ease-in forwards",
      },
      
      keyframes: {
        move: {
          "0%": { width: "0%" },
          "90%": {width:"70%"},
          "95%": {width:"60%"},
          "100%": { width: "65%" },
        },
        changeColor: {
          "0%": { backgroundImage: "linear-gradient(#D0B301,#D0B301);" },
          "50%": { backgroundImage: "linear-gradient(#D0B301, #292728);" },
          "100%": { backgroundImage: "linear-gradient(#292728,#292728);" },
        },
        changeColor2: {
          "0%": { backgroundImage: "linear-gradient(#F9F9F9,#F9F9F9);" },
          "50%": { backgroundImage: "linear-gradient(#F9F9F9, #D0B301);" },
          "100%": { backgroundImage: "linear-gradient(#D0B301,#D0B301);" },
        },
      },

      //for width
      width: {
        '50': '50px',
        '123': '123px'
      },

      //for height
      height: {
        '50': '50px'
      },

      //borderRadius
      borderRadius: {
        '10': '0.625rem',
      }
    },
  },
  plugins: [],
}