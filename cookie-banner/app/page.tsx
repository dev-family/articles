import styles from "./page.module.scss"

export default function Home() {
  return (
    <main className={styles.main}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 104 54"
        width="104"
        height="54"
      >
        <path
          fill="#55C133"
          d="M70.543 26.03a3.639 3.639 0 1 0 0-7.277 3.639 3.639 0 0 0 0 7.278Z"
        ></path>
        <path
          fill="#361CA5"
          d="M25.341 1.05v6.518c0 .16-.17.26-.31.18a9.715 9.715 0 0 0-5.947-1.19c-4.479.53-8.077 4.168-8.547 8.647-.62 5.868 3.968 10.826 9.716 10.826 1.74 0 3.359-.46 4.768-1.26.19-.11.43-.09.6.05l.81.68c.19.16.43.24.67.24h2.689c.58 0 1.05-.47 1.05-1.05V1.05c0-.58-.47-1.05-1.05-1.05h-3.4c-.579 0-1.049.47-1.049 1.05Zm-4.528 20.462a5.253 5.253 0 0 1-5.258-5.348c.05-2.859 2.509-5.218 5.368-5.158 1.78.04 3.339.96 4.258 2.34.11.17.16.37.16.57v4.688c0 .2-.05.4-.16.57a5.247 5.247 0 0 1-4.368 2.338ZM26.13 27.88c-.44 0-.79.35-.79.79 0 .16-.18.26-.319.18a9.7 9.7 0 0 0-6.128-1.16c-4.388.6-7.887 4.199-8.357 8.607-.63 5.878 3.969 10.846 9.717 10.846 1.74 0 3.358-.46 4.768-1.26.19-.11.43-.09.6.05l.81.68c.19.16.43.24.67.24h2.688c.58 0 1.05-.47 1.05-1.05V28.92c0-.58-.47-1.05-1.05-1.05h-3.658v.01Zm-5.317 14.745a5.259 5.259 0 0 1-5.258-5.348c.05-2.859 2.509-5.218 5.367-5.158 1.78.04 3.34.96 4.259 2.339.11.17.16.37.16.57v4.688c0 .2-.05.4-.16.57a5.247 5.247 0 0 1-4.369 2.339ZM98.484 28.519l-4.519 10.836c-.22.52-.95.52-1.16 0l-4.478-10.826c-.16-.39-.54-.65-.97-.65H83.97c-.75 0-1.26.77-.96 1.46l7.477 17.393c.07.17.05.37-.05.52l-.73 1.04c-.649.92-1.709 1.47-2.838 1.47h-.94c-.58 0-1.05.469-1.05 1.049v2.139c0 .58.47 1.05 1.05 1.05h1.68c1.809 0 3.358-.45 4.638-1.34 1.28-.89 2.359-2.439 3.229-4.618l7.957-18.693a1.05 1.05 0 0 0-.96-1.46h-3.009c-.44-.01-.82.24-.98.63ZM68.835 27.88h3.409c.58 0 1.05.47 1.05 1.049v16.884c0 .58-.47 1.05-1.05 1.05h-3.41c-.579 0-1.049-.47-1.049-1.05V28.919c0-.57.47-1.04 1.05-1.04ZM80.38 20.832h-3.408c-.58 0-1.05.47-1.05 1.05v23.931c0 .58.47 1.05 1.05 1.05h3.408c.58 0 1.05-.47 1.05-1.05V21.872c0-.57-.47-1.04-1.05-1.04ZM9.287 25.061h.23c.58 0 1.05-.47 1.05-1.05v-2.139c0-.58-.47-1.05-1.05-1.05h-.98a6.143 6.143 0 0 0-6.148 6.148v.42c0 .25-.2.45-.45.45h-.89C.47 27.85 0 28.32 0 28.9v2.139c0 .58.47 1.05 1.05 1.05h.89c.25 0 .45.2.45.45v13.274c0 .58.469 1.05 1.049 1.05h3.408c.58 0 1.05-.47 1.05-1.05V32.538c0-.25.2-.45.45-.45h1.87c.579 0 1.049-.47 1.049-1.05V28.9c0-.58-.47-1.05-1.05-1.05H8.197c-.25 0-.45-.2-.45-.45v-.8c0-.85.69-1.539 1.54-1.539ZM57.239 27.6a8.262 8.262 0 0 0-6.128 2.6c-.2.22-.55.21-.75 0a8.246 8.246 0 0 0-6.017-2.61c-2.06 0-3.939.76-5.388 2-.14.12-.35.03-.35-.15v-.52c0-.58-.47-1.05-1.05-1.05h-3.168c-.58 0-1.05.47-1.05 1.05v16.883c0 .58.47 1.05 1.05 1.05h3.398c.58 0 1.05-.47 1.05-1.05v-9.546c0-1.39.7-2.739 1.91-3.409.679-.38 1.489-.56 2.348-.47 2.02.22 3.499 2.04 3.499 4.069v9.356c0 .58.47 1.05 1.05 1.05h3.408c.58 0 1.05-.47 1.05-1.05v-9.636c0-.73.17-1.46.58-2.07a3.922 3.922 0 0 1 3.688-1.719c2.04.21 3.53 2.03 3.53 4.079v9.346c0 .58.469 1.05 1.049 1.05h3.408c.58 0 1.05-.46 1.05-1.04v-9.696c0-4.568-3.599-8.457-8.167-8.517ZM70.963 8.216 63.835 25.1c-.16.39-.54.64-.97.64h-4.288c-.42 0-.8-.25-.97-.64L50.51 8.216c-.29-.69.22-1.449.96-1.449h3.399c.43 0 .81.26.97.65l4.418 10.856c.21.52.95.52 1.16.01l4.578-10.866c.16-.39.54-.64.96-.64h3.018c.78-.01 1.29.75.99 1.44ZM46.332 20.644c-.36-.36-.92-.42-1.33-.12a5.2 5.2 0 0 1-3.058.99 5.256 5.256 0 0 1-4.699-2.9c-.17-.35.1-.75.48-.75h10.866c1.92 0 2.92-1.439 2.91-2.918 0-.77-.21-1.55-.44-2.13-1.53-4.048-5.658-6.827-10.357-6.257-4.308.53-7.697 3.748-8.407 8.027a9.775 9.775 0 0 0 9.637 11.436 9.73 9.73 0 0 0 6.018-2.08c.52-.41.57-1.11.11-1.57l-1.73-1.728Zm-9.077-6.748a5.256 5.256 0 0 1 9.397 0c.17.35-.1.75-.48.75h-8.427c-.4.01-.67-.4-.49-.75Z"
        ></path>
      </svg>
    </main>
  )
}
