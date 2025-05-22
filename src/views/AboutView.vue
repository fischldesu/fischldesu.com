<script setup lang="ts">

</script>

<template>
  <div class="about-view">
    <div class="background-container">
      <svg xmlns="http://www.w3.org/2000/svg" width="1920" height="1080" fill="none" viewBox="0 0 1920 1080"
        preserveAspectRatio="none">
        <g opacity=".2" clip-path="url(#E)">
          <path
            d="M1466.4 1795.2c950.37 0 1720.8-627.52 1720.8-1401.6S2416.77-1008 1466.4-1008-254.4-380.482-254.4 393.6s770.428 1401.6 1720.8 1401.6z"
            fill="url(#A)"></path>
          <path
            d="M394.2 1815.6c746.58 0 1351.8-493.2 1351.8-1101.6S1140.78-387.6 394.2-387.6-957.6 105.603-957.6 714-352.38 1815.6 394.2 1815.6z"
            fill="url(#B)"></path>
          <path
            d="M1548.6 1885.2c631.92 0 1144.2-417.45 1144.2-932.4S2180.52 20.4 1548.6 20.4 404.4 437.85 404.4 952.8s512.276 932.4 1144.2 932.4z"
            fill="url(#C)"></path>
          <path
            d="M265.8 1215.6c690.246 0 1249.8-455.595 1249.8-1017.6S956.046-819.6 265.8-819.6-984-364.005-984 198-424.445 1215.6 265.8 1215.6z"
            fill="url(#D)"></path>
        </g>
        <defs>
          <radialGradient id="A" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1466.4 393.6) rotate(90) scale(1401.6 1720.8)">
            <stop stop-color="#107c10"></stop>
            <stop offset="1" stop-color="#c4c4c4" stop-opacity="0"></stop>
          </radialGradient>
          <radialGradient id="B" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(394.2 714) rotate(90) scale(1101.6 1351.8)">
            <stop stop-color="#0078d4"></stop>
            <stop offset="1" stop-color="#c4c4c4" stop-opacity="0"></stop>
          </radialGradient>
          <radialGradient id="C" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(1548.6 952.8) rotate(90) scale(932.4 1144.2)">
            <stop stop-color="#ffb900" stop-opacity=".75"></stop>
            <stop offset="1" stop-color="#c4c4c4" stop-opacity="0"></stop>
          </radialGradient>
          <radialGradient id="D" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
            gradientTransform="translate(265.8 198) rotate(90) scale(1017.6 1249.8)">
            <stop stop-color="#d83b01" stop-opacity=".75"></stop>
            <stop offset="1" stop-color="#c4c4c4" stop-opacity="0"></stop>
          </radialGradient>
          <clipPath id="E">
            <path fill="#fff" d="M0 0h1920v1080H0z"></path>
          </clipPath>
        </defs>
      </svg>
    </div>
    <h1>About</h1>
    <section id="about-site-resource">
      <h3>Assets/Resources</h3>
      <p class="content">Some assets/resources are from Internet, <br>If you have any copyright issues, please contact
        me
        for deletion.</p>
      <p class="content-attach">Trace the image sources: <span>HTMLElementAttribute[srctrace]</span></p>
    </section>
    <section id="about-site-dev">
      <h3>Site Dev</h3>
      <p class="content">Main WebSite: a<span>SPA</span> created with
        <span>Vite</span>
        <span>Vue3</span>
        <span>TypeScript</span>
        running on
        <span>Node.js</span>
      </p>
      <p class="content-attach">
        Source Code At <a href="/">github</a>
      </p>
    </section>
    <section id="about-site-privacy">
      <h3>Privacy Policy</h3>
      <p class="content">This site does not collect any personal information unless you Actively upload, It does not use
        any third-party tracking or advertising services.
      </p>
    </section>
    <section id="about-simple-site-map">
      <h3>Site Map</h3>
      <table>
        <tbody>
          <tr>
            <td>Title</td>
            <td>URL</td>
            <td>Explain</td>
          </tr>
          <tr>
            <td>Main</td>
            <td><router-link to="/">fischldesu.com</router-link> </td>
            <td>Home Page</td>
          </tr>
          <tr>
            <td>Static</td>
            <td><a target="_blank" href="https://static.fischldesu.com/files">static.fischldesu.com</a></td>
            <td>Static resource</td>
          </tr>
          <tr>
            <td>Collection</td>
            <td><a target="_blank" href="">repo.fischldesu.com</a></td>
            <td>My Collections</td>
          </tr>
          <tr>
            <td>Blog</td>
            <td><a target="_blank" href="">blog.fischldesu.com</a></td>
            <td>My Blog</td>
          </tr>
        </tbody>
      </table>
      <p class="content">Main sites are as above</p>
    </section>
    <div class="bar">
      <h2>About fischldesu.com</h2>
      <br>
      <p class="content-attach">Contact Me <a href="mailto://fischldesu@outlook.com">fischldesu@outlook.com</a></p>
      <p class="content-attach">This WebSite mainly used for sharing computer programing technology</p>
      <p class="content-attach">备案信息 <a href="https://beian.miit.gov.cn/">蜀ICP备2025120962号-1</a></p>
      <p class="content-attach">©fischldesu 2015</p>
    </div>
    <section id="about-more">
      <h3>More Options</h3>
      <div style="margin-top: 8px; display: flex; flex-direction: column; gap: 14px;">
        <button>Clear All Cross-Origin Data</button>
      </div>
    </section>
    <div style="display: block; height: 64px;"><br></div>
  </div>
</template>

<style scoped>
.about-view {
  padding: 0 4vw;
}

.background-container {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.background-container>svg {
  width: 100%;
  height: 100%;
}

.bar {
  margin: 64px 0;
  width: 100%;
  background-color: rgba(240, 248, 255, 0.45);
  border-radius: 8px;
  border: 1px solid rgba(128, 128, 128, 0.3);
  box-shadow: 1px 1px 8px rgba(32, 32, 32, 0.1);
  padding: 16px;
  text-align: center;
}

section {
  margin-bottom: 16px;
}

h1 {
  font-size: 38px;
  font-weight: bold;
  margin: 16px 0;
  color: #333;
  border-bottom: 1px solid #ccc;
}

h2 {
  font-size: 22px;
  font-weight: bold;
}

.content {
  font-size: 18px;
  color: #333;
}

.content>span {
  border-radius: 4px;
  background-color: aliceblue;
  border: 1px solid gray;
  padding: 1px 4px;
  margin: 0 3px;
}

.content-attach>a {
  position: relative;
  text-decoration: underline;
  transition: color 0.3s ease;
}

.content-attach>a:hover {
  color: dodgerblue;
}

.content-attach>a:hover::after {
  content: '↑';
  position: absolute;
  transform: rotate(30deg) translateX(2px);
  font-size: 14px;
}

tr {
  border-top: 1px solid #ccc;
}

tr>td {
  padding-right: 6px;
}

tr>td>a {
  transition: color 0.3s ease;
}

tr>td>a:hover {
  color: dodgerblue;
}

tr>td>a[target]::after {
  content: '↗';
}

button {
  width: fit-content;
  padding: 4px 16px;
  border-radius: 10px;
  border: 0;
  background-color: rgb(255, 56, 86);
  letter-spacing: 1.5px;
  font-size: 15px;
  transition: all 0.3s ease;
  box-shadow: rgb(201, 46, 70) 0px 10px 0px 0px;
  color: hsl(0, 0%, 100%);
  cursor: pointer;
}

button:hover {
  transform: translateY(4px);
  box-shadow: rgb(201, 46, 70) 0px 7px 0px 0px;
}

button:active {
  background-color: rgb(255, 56, 86);
  box-shadow: rgb(201, 46, 70) 0px 0px 0px 0px;
  transform: translateY(12px);
  transition: 200ms;
}
</style>
