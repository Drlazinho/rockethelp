# Primeira Aplicação React Native - Aprendizado

# Desenvolvendo a RocketLabe

## Primeiros passos
-   Instale Expo Cli no terminal (se for a primeira vez)
````bash
yarn global add expo-cli

or

npm install -g expo cli
````
-   Instale o Expo Go no Android.
-   Crie projeto usando o comando `expo init <nomeDoProjeto>`
-   Apareca uma lista de opções. A opção Bareflow oferece o minimo para desenvolver para ambientes nativos.
-   Altere o tipo do arquivo App.js para `App.tsx`
-   Após criar um projeto, neste projeto cria um arquivo `tsconfig.json`
-   Execute o commando `expo start`, ele tambem vai perguntar se irá usar o typescript

#### Arquitetura das Pastas

Como no Reactjs, o React Native é semelhante. Cria se a pasta `src` onde ficará os nossos recursos que iremos criar.
Dentro desta criamos uma pasta `screen` onde ficará nossas telas

#### NativeBase

NativeBase é uma biblioteca de componentes que permite que os devs construam sistemas de design universais. Ele é construído em cima do React Native, permitindo que você desenvolva aplicativos para Android, iOS e web. [Página de Instalação](https://docs.nativebase.io/?utm_source=HomePage&utm_medium=Hero_Fold&utm_campaign=NativeBase_3)

*   Instale react-native-svg com expo
    *   expo install react-native-svg
*   Instale react-native-safe-area-context
    *   expo install react-native-safe-area-context

#### Usando Fonts Externas
É necessário instalar as fontes que queremos na nossa aplicação. O carregamento das fontes são assíncronas.

Para instalar
*   expo install expo-font @expo-google-fonts/(Nome da Fonte)

[Documentação](https://docs.expo.dev/guides/using-custom-fonts/)

#### React-native-svg-transformer

O React Native não reconhece SVG, sendo necessário instalar uma biblioteca.

`yarn add --dev react-native-svg-transformer`

[Documentação](https://github.com/kristerkari/react-native-svg-transformer)

Dentro do arquivo `metro.config.js` o conteúdo deve ser substituido pelo conteúdo que está na documentação do react-native-svg-transformer

Também é preciso tipifica o SVG, criando a pasta `@types` e dentro dela o arquivo `svg.d.ts`

#### Phosphor Icon
É um biblioteca de ícones que pode ser usada no React Native, React e etc.

Install `yarn add phosphor-react-native`