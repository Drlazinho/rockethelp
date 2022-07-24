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

## Estrutura visual e Navegação

### VStack e HStack
*   VStack empilha os elementos verticalmente
*   HStack empilha os elementos horizontalmente

### Types Props Native
Alguns elementos são tipificados pelo proprio Native
~~~~~react
import React from 'react'
import {Button as ButtonNativeBase, IButtonProps, Heading} from 'native-base'

type Props = IButtonProps & {   
  title: string;
}

export function Button({title, ...rest}: Props) {
  return ( 
....
~~~~
### UseState sem/com parametros - um detalhe.
Sempre quando quer executar uma função em uma interação, e essa função passa um parametro, o código deve ser escrito dessa forma 
~~~~react
    onPress={() => setStatusSelected('open')}
~~~~
Sem parametro...
~~~~react
onPress={setStatusSelected}
~~~~

### React-Navigation
Biblioteca de Rotas e Navegação para aplicações em Expo e React Native

`yarn add @react-navigation/native`

Dependencias da biblioteca

`yarn add react-native-screens react-native-safe-area-context`


Estratégia de Navegação do react-navigation em pilha (abrir uma janela de navegação sobre outra)

`yarn add @react-navigation/native-stack`

#### Aplicando React Navigation
A aplicação é semelhante no React-RouterDom.

~~~~react
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Home from '../screens/Home'
import Details from '../screens/Details'
import Register from '../screens/Register'

const {Navigator, Screen} = createNativeStackNavigator()

export function AppRoutes() {
  return(
    <Navigator screenOptions={{headerShown: false}}>
      <Screen name="home" component={Home}/>
      <Screen name="new" component={Register}/>
      <Screen name="details" component={Details}/>
    </Navigator>
  )
}
~~~~

#### Aplicando a navegação dentro de um contexto
~~~~react
import {NavigationContainer} from '@react-navigation/native'

import { SignIn } from '../screens/SignIn';
import {AppRoutes} from './app.routes';

export function Routes() {
  return(
    <NavigationContainer>
      <AppRoutes/>
    </NavigationContainer>
  )
}
~~~~