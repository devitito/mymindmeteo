/**
 * Autoinsert script tags (or other filebased tags) in an html file.
 *
 * ---------------------------------------------------------------
 *
 * Automatically inject <script> tags for javascript files and <link> tags
 * for css files.  Also automatically links an output file containing precompiled
 * templates using a <script> tag.
 *
 * For usage docs see:
 * 		https://github.com/Zolmeister/grunt-sails-linker
 *
 */
module.exports = function(grunt) {

  grunt.config.set('sails-linker', {
    devJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        //'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        //'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/layouts/welcome.ejs': require('../pipeline').jsFilesToInjectInWelcome,
        'views/layouts/mind.ejs': require('../pipeline').jsFilesToInjectInMeteo,
        'views/layouts/administrator.ejs': require('../pipeline').jsFilesToInjectInAdministrator
        //'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    devJsRelative: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        //'.tmp/public/**/*.html': require('../pipeline').jsFilesToInject,
        //'views/**/*.html': require('../pipeline').jsFilesToInject,
        'views/layouts/welcome.ejs': require('../pipeline').jsFilesToInjectInWelcome,
        'views/layouts/mind.ejs': require('../pipeline').jsFilesToInjectInMeteo,
        'views/layouts/administrator.ejs': require('../pipeline').jsFilesToInjectInAdministrator
        //'views/**/*.ejs': require('../pipeline').jsFilesToInject
      }
    },

    prodJs: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        //'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
        //'views/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/layouts/welcome.ejs': ['.tmp/public/min/production.welcome.min.js'],
        'views/layouts/mind.ejs': ['.tmp/public/min/production.meteo.min.js'],
        'views/layouts/administrator.ejs': ['.tmp/public/min/production.administrator.min.js']
        //'views/**/*.ejs': ['.tmp/public/min/production.min.js']
      }
    },

    prodJsRelative: {
      options: {
        startTag: '<!--SCRIPTS-->',
        endTag: '<!--SCRIPTS END-->',
        fileTmpl: '<script src="%s"></script>',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        //'.tmp/public/**/*.html': ['.tmp/public/min/production.min.js'],
        //'views/**/*.html': ['.tmp/public/min/production.min.js'],
        'views/layouts/welcome.ejs': ['.tmp/public/min/production.welcome.min.js'],
        'views/layouts/mind.ejs': ['.tmp/public/min/production.meteo.min.js'],
        'views/layouts/administrator.ejs': ['.tmp/public/min/production.administrator.min.js']
        //'views/**/*.ejs': ['.tmp/public/min/production.min.js']
      }
    },

    devStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    devStylesRelative: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        relative: true
      },

      files: {
        '.tmp/public/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.html': require('../pipeline').cssFilesToInject,
        'views/**/*.ejs': require('../pipeline').cssFilesToInject
      }
    },

    prodStyles: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/production.min.css']
      }
    },

    prodStylesRelative: {
      options: {
        startTag: '<!--STYLES-->',
        endTag: '<!--STYLES END-->',
        fileTmpl: '<link rel="stylesheet" href="%s">',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.html': ['.tmp/public/min/production.min.css'],
        'views/**/*.ejs': ['.tmp/public/min/production.min.css']
      }
    },

    // Bring in JST template object
    devTpl: {
      options: {
        startTag: '<!--TEMPLATES-->',
        endTag: '<!--TEMPLATES END-->',
        fileTmpl: '<script type="text/javascript" src="%s"></script>',
        appRoot: '.tmp/public'
      },
      files: {
        '.tmp/public/index.html': ['.tmp/public/jst.js'],
        'views/**/*.html': ['.tmp/public/jst.js'],
        'views/layouts/welcome.ejs': ['.tmp/public/jst-welcome.js'],
        'views/layouts/mind.ejs': ['.tmp/public/jst-meteo.js'],
        'views/layouts/administrator.ejs': ['.tmp/public/jst-administrator.js']
        //'views/**/*.ejs': ['.tmp/public/jst.js']
      }
    },

    devJsJade: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s")',
        appRoot: '.tmp/public'
      },
      files: {
        //'views/**/*.jade': require('../pipeline').jsFilesToInject
        'views/layouts/welcome.jade': require('../pipeline').jsFilesToInjectInWelcome,
        'views/layouts/mind.jade': require('../pipeline').jsFilesToInjectInMeteo,
        'views/layouts/administrator.jade': require('../pipeline').jsFilesToInjectInAdministrator
      }
		},

    devJsRelativeJade: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        //'views/**/*.jade': require('../pipeline').jsFilesToInject
        'views/layouts/welcome.jade': require('../pipeline').jsFilesToInjectInWelcome,
        'views/layouts/mind.jade': require('../pipeline').jsFilesToInjectInMeteo,
        'views/layouts/administrator.jade': require('../pipeline').jsFilesToInjectInAdministrator
      }
    },

    prodJsJade: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s")',
        appRoot: '.tmp/public'
      },
      files: {
        //'views/**/*.jade': ['.tmp/public/min/production.min.js']
        'views/layouts/welcome.jade': ['.tmp/public/min/production.welcome.min.js'],
        'views/layouts/mind.jade': ['.tmp/public/min/production.meteo.min.js'],
        'views/layouts/administrator.jade': ['.tmp/public/min/production.administrator.min.js']
      }
    },

    prodJsRelativeJade: {
      options: {
        startTag: '// SCRIPTS',
        endTag: '// SCRIPTS END',
        fileTmpl: 'script(src="%s")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        //'views/**/*.jade': ['.tmp/public/min/production.min.js']
        'views/layouts/welcome.jade': ['.tmp/public/min/production.welcome.min.js'],
        'views/layouts/mind.jade': ['.tmp/public/min/production.meteo.min.js'],
        'views/layouts/administrator.jade': ['.tmp/public/min/production.administrator.min.js']
      }
    },

    devStylesJade: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s")',
        appRoot: '.tmp/public'
      },

      files: {
        'views/**/*.jade': require('../pipeline').cssFilesToInject
      }
    },

    devStylesRelativeJade: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s")',
        appRoot: '.tmp/public',
        relative: true
      },

      files: {
        'views/**/*.jade': require('../pipeline').cssFilesToInject
      }
    },

    prodStylesJade: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/**/*.jade': ['.tmp/public/min/production.min.css']
      }
    },

    prodStylesRelativeJade: {
      options: {
        startTag: '// STYLES',
        endTag: '// STYLES END',
        fileTmpl: 'link(rel="stylesheet", href="%s")',
        appRoot: '.tmp/public',
        relative: true
      },
      files: {
        'views/**/*.jade': ['.tmp/public/min/production.min.css']
      }
    },

    // Bring in JST template object
    devTplJade: {
      options: {
        startTag: '// TEMPLATES',
        endTag: '// TEMPLATES END',
        fileTmpl: 'script(type="text/javascript", src="%s")',
        appRoot: '.tmp/public'
      },
      files: {
        'views/layouts/welcome.jade': ['.tmp/public/jst-welcome.js'],
        'views/layouts/mind.jade': ['.tmp/public/jst-meteo.js'],
        'views/layouts/administrator.jade': ['.tmp/public/jst-administrator.js']
        //'views/**/*.jade': ['.tmp/public/jst.js']
      }
    }
  });

  grunt.loadNpmTasks('grunt-sails-linker');
};
