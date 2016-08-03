# **LEM** - LimeSurvey Expression Manager

## Overview

This Expression manager should evaluate all the expresseions in the LimeSurvey questions. 
It is split into three main methodics, that work hand in hand.

* modules
    * Modules are the filter of what needs to be done with an expression, if it is a relevance question, or if it is a value that needs to be evaluated.
* parsers
    * In the parsers, there are the different methods of parsing a value. A.e.: read a Date-Object from a DateTime-input or a multiple Select
* selectors
    * In selectors the different methods are described how to read from an input.

## Adding Methods

**Please be advised**, that for editing the LEM you need a working node, gulp and babel environment.
By installing [nodejs](http://www.nodejs.org/) and running 

    npm install 

in the base directory this should be achived.

If you want to add a Method please see that it is logically bound to the module/selector/parser that is already available.
A.e. don't add a parse_video Method into a textarea selector, but make a new parser and publish it in a module.

A selector should select somethng and then prepare a reference and give it to a parser.

This flow should be described in a module.