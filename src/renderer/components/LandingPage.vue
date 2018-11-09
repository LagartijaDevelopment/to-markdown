<template>
  <div id="wrapper">
    <img id="logo" src="~@/assets/logo.png" alt="electron-vue">
    <main>
      <div class="left-side">
        <div class="doc">
          <div class="title">Select file</div>
          <p>
            We expect to convert docx to markdown to make easy blog posts.
          </p>
          <div class="file-input">
            <input type="file" @change="onFileChange">
          </div>
          <button @click="convert()">Convert</button><br><br>
        </div>
      </div>

      <div class="right-side">
        <div class="title">Markdown Preview</div>
        <markdown-preview></markdown-preview>
      </div>
    </main>
  </div>
</template>

<script>
  import MarkdownPreview from './LandingPage/MarkdownPreview'
  import fs from 'fs'

  export default {
    name: 'landing-page',
    data: function () {
      return {
        fileSelected: ''
      }
    },
    components: { MarkdownPreview },
    methods: {
      onFileChange (file) {
        var mammoth = require('mammoth')
        this.readFileInputEventAsDataUrl(event, (arrayBuffer) => {
          info('entrando al callback')
          mammoth.convertToMarkdown({buffer: arrayBuffer})
            .then((result) => {
              document.getElementById('preview').innerHTML = result.value
            })
            .done()
        })
        // var files = file.target.files || file.dataTransfer.files
        // var reader = new FileReader()
        // reader.onload = (e) => {
        //   this.fileSelected = e.target.result
        // }
        // reader.readAsDataURL(files[0])
      },
      readFileInputEventAsDataUrl (event, callback) {
        console.log('si entra al readfileinput')
        var file = event.target.files[0]
        var reader = new FileReader()
        reader.onload = (loadEvent) => {
          var arrayBuffer = loadEvent.target.result
          console.log('imprimiendo arrayBuffer en onload', arrayBuffer)
          callback(arrayBuffer)
        }
        reader.readAsDataURL(file)
      },
      displayResult (result) {
        document.getElementById('preview').innerHTML = result.value
        // if (this.fileSelected) {
        //   console.log(this.fileSelected)
        //   mammoth.convertToMarkdown({ buffer: this.fileSelected })
        //     .then((result) => {
        //       document.getElementById('preview').innerHTML = result.value
        //     })
        //     .done()
        // }
      },
      convert (file) {
        //   console.log(this.fileSelected)
        //   mammoth.convertToMarkdown({ buffer: this.fileSelected })
        //     .then(this.displayResult())
        //     .done()
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body { font-family: 'Source Sans Pro', sans-serif; }

  #wrapper {
    background:
      radial-gradient(
        ellipse at top left,
        rgba(255, 255, 255, 1) 40%,
        rgba(229, 229, 229, .9) 100%
      );
    height: 100vh;
    padding: 60px 80px;
    width: 100vw;
  }

  #logo {
    height: auto;
    margin-bottom: 20px;
    width: 420px;
  }

  main {
    display: flex;
    justify-content: space-between;
  }

  main > div { flex-basis: 50%; }

  .left-side {
    display: flex;
    flex-direction: column;
  }

  .welcome {
    color: #555;
    font-size: 23px;
    margin-bottom: 10px;
  }

  .title {
    color: #2c3e50;
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 6px;
  }

  .title.alt {
    font-size: 18px;
    margin-bottom: 10px;
  }

  .doc p {
    color: black;
    margin-bottom: 10px;
  }

  .doc button {
    font-size: .8em;
    cursor: pointer;
    outline: none;
    padding: 0.75em 2em;
    border-radius: 2em;
    display: inline-block;
    color: #fff;
    background-color: #4fc08d;
    transition: all 0.15s ease;
    box-sizing: border-box;
    border: 1px solid #4fc08d;
  }

  .doc button.alt {
    color: #42b983;
    background-color: transparent;
  }

  .file-input {
    padding-right: 5px;
    padding-bottom: 15px;
  }
</style>
