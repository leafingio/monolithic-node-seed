global.rootRequire = (name) => require(`../${name}`);

global.moduleRequire = (name) => require(`../modules/${name}`);