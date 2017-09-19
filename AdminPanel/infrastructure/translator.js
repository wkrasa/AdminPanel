'use strict';

var path = require('path');
var fs = require('fs');

var defaultOptions = {
    defaultLang: 'en-GB'
    , languages: ['en-GB']
    , sourceDirectory: ''
};

var translatorEngine = function (options) {
    var self = this;
    self.files = [];
    self.translations = {};

    self.init = function (options) {
        self.options = Object.assign({}, defaultOptions, options);
        self.options.languages.forEach(function (lang) {
            self.translations[lang] = {};
        });
        self.lang = self.options.defaultLang;
    };

    self.translate = function (str) {
        return self.translations[self.lang][str];
    };

    self.setLang = function (lang) {
        self.lang = lang;
    };

    self.loadTranslations = function (translationsPath) {
        var dirContent = fs.readdirSync(translationsPath);
        dirContent.forEach(function (filePath) {
            var currentPath = path.join(translationsPath, filePath);
            if (fs.lstatSync(currentPath).isDirectory()) {
                self.loadTranslations(currentPath);
            }
            else if (fs.lstatSync(currentPath).isFile()) {
                self.loadTranslationsFile(currentPath);
            }
        });
    };

    self.loadTranslationsFile = function (filePath) {
        self.options.languages.forEach(function (lang) {
            if (filePath.indexOf(lang) > -1) {
                var translationsData = require(filePath);
                for (var key in translationsData) {
                    self.translations[lang][key] = translationsData[key];
                }
            }
        });        
    };

    self.init(options);
    return self;
};

var translator = function (options) {
    var engine = new translatorEngine(options);
    engine.loadTranslations(engine.options.sourceDirectory);
    return function (req, res, next) {
        req.setLang = engine.setLang;
        res.locals.__ = engine.translate;
        next();
    };
};

module.exports = translator;





