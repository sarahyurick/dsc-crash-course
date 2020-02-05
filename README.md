# Crash Course: Front End Development

## Understanding MV* Application Architecture

![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eae09d7b-a76d-4f20-aedf-5a5a45e2061d/Untitled.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/eae09d7b-a76d-4f20-aedf-5a5a45e2061d/Untitled.png)

In general, it's hard to maintain a non-modular codebase.  We accomplish this more easily by decoupling the ***model*** and the ***view.***

### The Model

The model is responsible for the content found on a page of a web app.  It processes backend requests to fetch page data, and processes the data as necessary.  It feeds raw data to the view, without any information on how it should be displayed.

### The View

The view handles the presentation of the page.  It doesn't care what's being displayed, but it needs to look good.  It needs some interface to interact with the model so that it can retrieve the data.  There are many different approaches to this, some of which will be discussed later.

## Building a Front End

We're going to build a basic todo list application in Vue.js.  It's a lightweight frontend framework that uses the principles discussed previously.

### Installing Vue.js

You'll need to install node.js from [https://nodejs.org/en/](https://nodejs.org/en/), or using your package manager of choice.  Once you've done that, install vue with `npm install -g @vue/cli`

### Creating a Project

We'll make a project called "todo-list" by running 

`vue create todo-list`
