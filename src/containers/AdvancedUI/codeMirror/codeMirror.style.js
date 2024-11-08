import React, { Component } from 'react';
import CodeMirrors from '../../../components/uielements/codeMirror';
import styled from 'styled-components';

const CodeMirrorEditor = props => <CodeMirrors {...props} />;

const CodeMirror = styled(CodeMirrorEditor)`
  .CodeMirror {
    font-family: monospace;
    height: 300px;
    position: relative;
    overflow: hidden;
    pre {
      padding: 0 4px;
      -moz-border-radius: 0;
      -webkit-border-radius: 0;
      border-radius: 0;
      border-width: 0;
      background: transparent;
      font-family: inherit;
      font-size: inherit;
      margin: 0;
      white-space: pre;
      word-wrap: normal;
      line-height: inherit;
      color: inherit;
      z-index: 2;
      position: relative;
      overflow: visible;
      -webkit-tap-highlight-color: transparent;
      -webkit-font-variant-ligatures: contextual;
      font-variant-ligatures: contextual;
    }
    div.CodeMirror-secondarycursor {
      border-left: 1px solid silver;
    }
  }
  .CodeMirror-lines {
    padding: 4px 0;
    cursor: text;
    min-height: 1px;
  }
  .CodeMirror-scrollbar-filler {
    background-color: white;
    position: absolute;
    z-index: 6;
    display: none;
    right: 0;
    bottom: 0;
  }
  .CodeMirror-gutter-filler {
    background-color: white;
    position: absolute;
    z-index: 6;
    display: none;
    left: 0;
    bottom: 0;
  }
  .CodeMirror-gutters {
    border-right: 1px solid #dddddd;
    background-color: #f7f7f7;
    white-space: nowrap;
    position: absolute;
    left: 0;
    top: 0;
    min-height: 100%;
    z-index: 3;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-linenumbers {
  }
  .CodeMirror-linenumber {
    padding: 0 3px 0 5px;
    min-width: 20px;
    text-align: right;
    color: #999999;
    white-space: nowrap;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-guttermarker {
    color: black;
  }
  .CodeMirror-guttermarker-subtle {
    color: #999999;
  }
  .CodeMirror-cursor {
    border-left: 1px solid black;
    border-right: none;
    width: 0;
    position: absolute;
    pointer-events: none;
  }
  .cm-fat-cursor .CodeMirror-cursor {
    width: auto;
    border: 0 !important;
    background: #77ee77;
  }
  .cm-fat-cursor div.CodeMirror-cursors {
    z-index: 1;
  }
  .cm-animate-fat-cursor {
    width: auto;
    border: 0;
    -webkit-animation: blink 1.06s steps(1) infinite;
    -moz-animation: blink 1.06s steps(1) infinite;
    animation: blink 1.06s steps(1) infinite;
    background-color: #77ee77;
  }
  .CodeMirror-overwrite .CodeMirror-cursor {
  }
  .cm-tab {
    display: inline-block;
    text-decoration: inherit;
  }
  .CodeMirror-rulers {
    position: absolute;
    left: 0;
    right: 0;
    top: -50px;
    bottom: -20px;
    overflow: hidden;
  }
  .CodeMirror-ruler {
    border-left: 1px solid #cccccc;
    top: 0;
    bottom: 0;
    position: absolute;
  }
  .cm-s-default {
    .cm-variable,
    .cm-punctuation,
    .cm-property,
    .cm-operator {
    }
    .cm-variable-3,
    .cm-type {
      color: #008855;
    }
    .cm-header {
      color: blue;
    }
    .cm-quote {
      color: #009900;
    }
    .cm-keyword {
      color: #770088;
    }
    .cm-atom {
      color: #221199;
    }
    .cm-number {
      color: #116644;
    }
    .cm-def {
      color: #0000ff;
    }
    .cm-variable-2 {
      color: #0055aa;
    }
    .cm-comment {
      color: #aa5500;
    }
    .cm-string {
      color: #aa1111;
    }
    .cm-string-2 {
      color: #ff5500;
    }
    .cm-meta {
      color: #555555;
    }
    .cm-qualifier {
      color: #555555;
    }
    .cm-builtin {
      color: #3300aa;
    }
    .cm-bracket {
      color: #999977;
    }
    .cm-tag {
      color: #117700;
    }
    .cm-attribute {
      color: #0000cc;
    }
    .cm-hr {
      color: #999999;
    }
    .cm-link {
      color: #0000cc;
    }
    .cm-error {
      color: #ff0000;
    }
  }
  .cm-negative {
    color: #dd4444;
  }
  .cm-positive {
    color: #229922;
  }
  .cm-header,
  .cm-strong {
    font-weight: bold;
  }
  .cm-em {
    font-style: italic;
  }
  .cm-link {
    text-decoration: underline;
  }
  .cm-strikethrough {
    text-decoration: line-through;
  }
  .cm-invalidchar {
    color: #ff0000;
  }
  .CodeMirror-composing {
    border-bottom: 2px solid;
  }
  div.CodeMirror span.CodeMirror-matchingbracket {
    color: #00ff00;
  }
  div.CodeMirror span.CodeMirror-nonmatchingbracket {
    color: #ff2222;
  }
  .CodeMirror-matchingtag {
    background: rgba(255, 150, 0, 0.3);
  }
  .CodeMirror-activeline-background {
    background: #e8f2ff;
  }
  .CodeMirror-scroll {
    overflow: scroll !important;
    margin-bottom: -30px;
    margin-right: -30px;
    padding-bottom: 30px;
    height: 100%;
    outline: none;
    position: relative;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-sizer {
    position: relative;
    border-right: 30px solid transparent;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-vscrollbar {
    position: absolute;
    z-index: 6;
    display: none;
    right: 0;
    top: 0;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  .CodeMirror-hscrollbar {
    position: absolute;
    z-index: 6;
    display: none;
    bottom: 0;
    left: 0;
    overflow-y: hidden;
    overflow-x: scroll;
  }
  .CodeMirror-gutter {
    white-space: normal;
    height: 100%;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -30px;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }
  .CodeMirror-gutter-wrapper {
    position: absolute;
    z-index: 4;
    background: none !important;
    border: none !important;
    ::selection {
      background-color: transparent;
    }
    ::-moz-selection {
      background-color: transparent;
    }
  }
  .CodeMirror-gutter-background {
    position: absolute;
    top: 0;
    bottom: 0;
    z-index: 4;
  }
  .CodeMirror-gutter-elt {
    position: absolute;
    cursor: default;
    z-index: 4;
  }
  .CodeMirror-wrap pre {
    word-wrap: break-word;
    white-space: pre-wrap;
    word-break: normal;
  }
  .CodeMirror-linebackground {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 0;
  }
  .CodeMirror-linewidget {
    position: relative;
    z-index: 2;
    overflow: auto;
  }
  .CodeMirror-widget {
  }
  .CodeMirror-rtl pre {
    direction: rtl;
  }
  .CodeMirror-code {
    outline: none;
  }
  .CodeMirror-measure {
    position: absolute;
    width: 100%;
    height: 0;
    overflow: hidden;
    visibility: hidden;
    pre {
      position: static;
    }
  }
  div.CodeMirror-cursors {
    visibility: hidden;
    position: relative;
    z-index: 3;
  }
  div.CodeMirror-dragcursors {
    visibility: visible;
  }
  .CodeMirror-focused div.CodeMirror-cursors {
    visibility: visible;
  }
  .CodeMirror-focused .CodeMirror-selected {
    background: #d7d4f0;
  }
  .CodeMirror-selected {
    background: #d9d9d9;
  }
  .CodeMirror-crosshair {
    cursor: crosshair;
  }
  .CodeMirror-line::selection,
  .CodeMirror-line > span::selection,
  .CodeMirror-line > span > span::selection {
    background: #d7d4f0;
  }
  .CodeMirror-line::-moz-selection,
  .CodeMirror-line > span::-moz-selection,
  .CodeMirror-line > span > span::-moz-selection {
    background: #d7d4f0;
  }
  .cm-searching {
    background: #ffffaa;
    background: rgba(255, 255, 0, 0.4);
  }
  .cm-force-border {
    padding-right: 0.1px;
  }
  .cm-tab-wrap-hack:after {
    content: '';
  }
  span.CodeMirror-selectedtext {
    background: none;
  }
`;

const CodeMirrorToolbar = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;

  .ant-form-item {
    display: flex;
    align-items: center;
    margin-right: 30px;

    &:last-child {
      margin-right: 0;
    }
  }
`;

export default CodeMirror;
export { CodeMirrorToolbar };
