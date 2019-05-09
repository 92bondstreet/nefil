# NEFIL

> Medical reports dashboard analytics

![Photo by @zhenhu2424](https://source.unsplash.com/Xruf17OrkwM/800x600)

## 🐣 Introduction

Very - _very very_ - first iteration of a web application connected to the [FHIR standard](https://www.hl7.org/fhir) that will upload a document and give some reporting to the user.

## 🏗️  Installation

```sh
❯ git clone git@github.com:92bondstreet/nefil.git
❯ make install
```

**Note:**

* Bootstrapped with [create-react-app v3](https://github.com/facebook/create-react-app/blob/master/CHANGELOG.md)
* Based on [React Hooks](https://reactjs.org/docs/hooks-intro.html) (at least React 16.8)
* [Yarn](https://yarnpkg.com) is the package manager

## 🕹️  Usage

```sh
## start local web application for dev purpose
❯ make sandbox

## start local desktop application for dev purpose
❯ make sandbox-desktop
```

## 📦 Distribution and Packaging

```sh
## build a ready-production web application
❯ make build

## build a ready-production desktop application
❯ make build-desktop
❯ make build-desktop -- -lm # for linux and mac
❯ make build-desktop [-- <args>] # where args is the electron-builder building commands: https://www.electron.build/cli
```

## 📱 Features

- [X] 🎯 Select file with a drop zone
- [X] 📡 Send files content as `Binary` to the [fhir API Server](https://fhirtest.uhn.ca/baseDstu3/Binary)
- [X] 📈 Get some analytics from [fhir Server](https://hapi.fhir.org/)
- [X] 📦 Pack a desktop application with [Electron](https://electronjs.org)

## 🚀 Deploy

![Deploy to Now](https://badgen.net/badge/%E2%96%B2%20Deploy%20to%20Now/$%20now%2092bondstreet%2Fnefil/black)

```sh
❯ make deploy
```

## 🌱 Inspiration - deep dive reading

* [Lifen Frontend Challenge](https://github.com/honestica/frontend-jobs)
