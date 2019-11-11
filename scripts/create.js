
const path = require('path');
const fs = require('fs');

const SRCDIR = path.join(process.cwd(), 'src');
const COMPONENTDIR = path.join(SRCDIR, 'components');

const ALLOWED_CREATION_OPTION = {
  COMPONENT: 'component',
};
const ALLOWED_COMPONENT_TYPES = [
  'atoms',
  'molecules',
  'organisms',
];

const scriptPath = path.dirname(process.argv[1]);
const templatePath = path.join(scriptPath, 'templates', 'component');

const componentTemplateFiles = [
  'index.js.template',
  'component.jsx.template',
  'component.scss.template',
  'component.stories.jsx.template',
  'component.test.jsx.template',
];

const nameRegExp = new RegExp('[A-Z]{0,}[a-z]{1,}|[a-zA-Z]+', 'g');

const createOptionArg = process.argv[2] || null;
const componentPathArg = process.argv[3] || null;

const getPathMatches = (pathSegment) => {
  const matches = pathSegment.match(nameRegExp);

  if (!matches) {
    console.error(
      `Could not normalize path segment (only characters between a-z, A-Z and - allowed): ${pathSegment}`,
    );
    process.exit(0);
  }

  return matches;
};

const normalizePath = pathSegments => pathSegments.map((pathSegment) => {
  const matches = getPathMatches(pathSegment);

  return matches.map(match => match.toLowerCase()).join('-');
});

const camelCasePath = pathSegments => pathSegments.map((pathSegment) => {
  const matches = getPathMatches(pathSegment);

  return matches.map(
    nameSegment => `${nameSegment[0].toUpperCase()}${nameSegment.slice(1)}`,
  ).join('');
});

const interpolateData = (data, replacements) => data.replace(
  /<%\s*(.*?)\s*%>/g,
  (fullPlaceholder, placeholderCode) => replacements[placeholderCode] || fullPlaceholder,
);

function createComponent(componentPath) {
  const splitComponentPathSegments = componentPath.split('/')
    .map(pathSegment => pathSegment.trim())
    .filter(pathSegment => pathSegment);

  if (splitComponentPathSegments.length < 2) {
    console.error(
      `Missing component type or name: ${[splitComponentPathSegments, '*'].join('/')} <---`,
    );
    process.exit(0);
  }

  const hyphenatedComponentPathSegments = normalizePath(splitComponentPathSegments);
  const hyphenatedComponentPath = hyphenatedComponentPathSegments.join('/');

  const camelCasedComponentPathSegments = camelCasePath(splitComponentPathSegments);
  const camelCasedComponentPath = camelCasedComponentPathSegments.join('/');

  const componentType = hyphenatedComponentPathSegments[0].toLowerCase();

  if (!ALLOWED_COMPONENT_TYPES.includes(componentType)) {
    console.error(`Invalid component type: ${componentType}`);
    process.exit(0);
  }

  const hyphenatedComponentName = hyphenatedComponentPathSegments[
    hyphenatedComponentPathSegments.length - 1
  ];
  const caseCamelCaseComponentName = camelCasedComponentPathSegments[
    camelCasedComponentPathSegments.length - 1
  ];


  const hyphenatedComponentDirSegments = hyphenatedComponentPathSegments.slice(
    0,
    hyphenatedComponentPathSegments.length - 1,
  );

  const componentDirPath = path.join(
    COMPONENTDIR,
    ...hyphenatedComponentDirSegments,
    hyphenatedComponentName,
  );

  const replacements = {
    HyphenatedName: hyphenatedComponentName,
    CamelCaseName: caseCamelCaseComponentName,

    FullHyphenatedPath: hyphenatedComponentPath,
    FullCamelCasePath: camelCasedComponentPath,

    LowerCaseCamelCaseName: `${caseCamelCaseComponentName[0].toLowerCase()}${caseCamelCaseComponentName.slice(1)}`,
  };

  fs.mkdirSync(componentDirPath, { recursive: true });

  componentTemplateFiles.forEach((componentTemplateFile) => {
    const newFileName = componentTemplateFile
      .replace('.template', '')
      .replace('component.', `${hyphenatedComponentName}.`);

    const fullSrcFilePath = path.join(templatePath, componentTemplateFile);
    const fullDestFilePath = path.join(componentDirPath, newFileName);

    fs.readFile(fullSrcFilePath, (err, data) => {
      if (err) {
        console.error(`Error on reading file: ${componentTemplateFile}`);
        process.exit(0);
      }
      const interpolatedData = interpolateData(data.toString(), replacements);

      fs.writeFile(fullDestFilePath, interpolatedData, { mode: 0o666 }, (err) => {
        if (err) {
          console.error(`Error on writing file: ${newFileName}`);
          process.exit(0);
        }
      });
    });
  });
}

if (ALLOWED_CREATION_OPTION.COMPONENT === createOptionArg) {
  createComponent(componentPathArg);
} else {
  console.error('Unknown creation option');
}
