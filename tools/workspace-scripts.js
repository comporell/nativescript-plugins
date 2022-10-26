module.exports = {
  message: 'NativeScript Plugins ~ made with ❤️  Choose a command to start...',
  pageSize: 32,
  scripts: {
    default: 'nps-i',
    nx: {
      script: 'nx',
      description: 'Execute any command with the @nrwl/cli',
    },
    format: {
      script: 'nx format:write',
      description: 'Format source code of the entire workspace (auto-run on precommit hook)',
    },
    '🔧': {
      script: `npx cowsay "NativeScript plugin demos make developers 😊"`,
      description: '_____________  Apps to demo plugins with  _____________',
    },
    // demos
    apps: {
      '...Vanilla...': {
        script: `npx cowsay "Nothing wrong with vanilla 🍦"`,
        description: ` 🔻 Vanilla`,
      },
      demo: {
        clean: {
          script: 'nx run demo:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo:android',
          description: '⚆  Run Android  🤖',
        },
      },
      '...Angular...': {
        script: `npx cowsay "Test all the Angles!"`,
        description: ` 🔻 Angular`,
      },
      'demo-angular': {
        clean: {
          script: 'nx run demo-angular:clean',
          description: '⚆  Clean  🧹',
        },
        ios: {
          script: 'nx run demo-angular:ios',
          description: '⚆  Run iOS  ',
        },
        android: {
          script: 'nx run demo-angular:android',
          description: '⚆  Run Android  🤖',
        },
      },
    },
    '⚙️': {
      script: `npx cowsay "@comporell/* packages will keep your ⚙️ cranking"`,
      description: '_____________  @comporell/*  _____________',
    },
    // packages
    // build output is always in dist/packages
    '@comporell': {
      // @comporell/nativescript-mht-printer
      'nativescript-mht-printer': {
        build: {
          script: 'nx run nativescript-mht-printer:build.all',
          description: '@comporell/nativescript-mht-printer: Build',
        },
      },
      // @comporell/nativescript-accordion
      'nativescript-accordion': {
        build: {
          script: 'nx run nativescript-accordion:build.all',
          description: '@comporell/nativescript-accordion: Build',
        },
      },
      // @comporell/nativescript-sms-receiver
      'nativescript-sms-receiver': {
        build: {
          script: 'nx run nativescript-sms-receiver:build.all',
          description: '@comporell/nativescript-sms-receiver: Build',
        },
      },
      'build-all': {
        script: 'nx run-many --target=build.all --all',
        description: 'Build all packages',
      },
    },
    '⚡': {
      script: `npx cowsay "Focus only on source you care about for efficiency ⚡"`,
      description: '_____________  Focus (VS Code supported)  _____________',
    },
    focus: {
      'nativescript-mht-printer': {
        script: 'nx run nativescript-mht-printer:focus',
        description: 'Focus on @comporell/nativescript-mht-printer',
      },
      'nativescript-accordion': {
        script: 'nx run nativescript-accordion:focus',
        description: 'Focus on @comporell/nativescript-accordion',
      },
      'nativescript-sms-receiver': {
        script: 'nx run nativescript-sms-receiver:focus',
        description: 'Focus on @comporell/nativescript-sms-receiver',
      },
      reset: {
        script: 'nx g @nativescript/plugin-tools:focus-packages',
        description: 'Reset Focus',
      },
    },
    '.....................': {
      script: `npx cowsay "That's all for now folks ~"`,
      description: '.....................',
    },
  },
};
