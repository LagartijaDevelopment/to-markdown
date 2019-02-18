<template>
	<div id="wrapper">
		<main>
			<v-container text-xs-center>
				<img v-if="darkTheme" class="logo" id="white-logo" src="~@/assets/tm-logo-white.png" alt="lagartija development logo">
				<img v-else class="logo" id="black-logo" src="~@/assets/tm-logo-black.png" alt="lagartija development black logo">

				<div v-if="!fileSelectedOnHtml && !fileSelectedOnMd">
					<h2 class="select-title">Select file</h2>
					<p>We expect to convert docx files to markdown files to make easy blog posts.</p>
					<v-container>
						<v-layout align-center justify-center>
							<v-flex xs4 sm4 md4>
								<file-input @file-uploaded="onFileUpload"></file-input>
							</v-flex>
						</v-layout>
					</v-container>

					<!-- Elements of file history -->
					<v-container v-if="fileHistory.length > 0">
						<files-list :files="fileHistory" @file-selected="convertFile"></files-list>
					</v-container>
				</div>

				<!-- Elements when a file has been selected or uploaded -->
				<div v-if="fileSelectedOnHtml && fileSelectedOnMd">
					<v-btn color="info" @click="downloadFile()">Download File</v-btn>
					<v-btn color="warning" @click="uploadNewFile()">New File</v-btn>
					<div v-if=fileDownloaded>
						<p>File Downloaded and Saved Correctly</p>
					</div>
					<h3>Markdown Preview</h3>
					<markdown-preview :file-on-html="fileSelectedOnHtml"></markdown-preview>
				</div>
			</v-container>
		</main>
	</div>
</template>

<script>
	import MarkdownPreview from './MarkdownPreview/MarkdownPreview';
	import FileInput from './FileInput/FileInput';
	import FilesList from './FilesList/FilesList';
	import {
		ipcRenderer
	} from 'electron';
	const marked = require('marked');
	
	export default {
		name: 'landing-page',
		props: {
			darkTheme: Boolean
		},
		components: {
			MarkdownPreview,
			FileInput,
			FilesList
		},
		data: function() {
			return {
				fileSelectedOnHtml: '',
				fileSelectedOnMd: '',
				fileDownloaded: false,
				fileHistory: [],
				convertFile: (path) => {
					ipcRenderer.send('convert-file', {
						path: path
					});
					ipcRenderer.on('asynchronous-reply', (event, arg) => {
						this.fileSelectedOnMd = arg;
						this.fileSelectedOnHtml = marked(arg, {
							sanitize: true
						});
						this.fileDownloaded = false;
					});
				}
			};
		},
		methods: {
			onFileUpload(file) {
				this.readFileInputEvent(file, this.convertFile);
			},
			readFileInputEvent(file, callback) {
				this.fileHistory.push({
					name: file.name,
					path: file.path
				});
				callback(file.path);
			},
			downloadFile() {
				ipcRenderer.send('download-file', {
					file: this.fileSelectedOnMd
				});
				ipcRenderer.on('file-download-success', (event, arg) => {
					this.fileDownloaded = true;
				});
			},
			uploadNewFile() {
				this.fileDownloaded = false;
				this.fileSelectedOnHtml = null;
				this.fileSelectedOnMd = null;
			}
		}
	};
</script>

<style>
	@import url('https://fonts.googleapis.com/css?family=Source+Sans+Pro');
	* {
		box-sizing: border-box;
		margin: 0;
		padding: 0;
	}
	
	body {
		font-family: 'Source Sans Pro', sans-serif;
	}
	
	.logo {
		height: auto;
		margin-bottom: 20px;
		width: 220px;
		max-height: 220px;
	}
	
	main {
		display: flex;
		justify-content: space-between;
	}
	
	main>div {
		flex-basis: 50%;
	}
</style>
