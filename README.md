# Passo a Passo para reproduzir o problema
Bug relacionado ao Lightning Component em Mobile [iOS or Android]

**Titulo:** Aplicativo Mobile para de carregar componente Lightning, após chamar o método window.history.back()

**Afeta:** iOS e Android

**Passo para reprodução do problema:**
1)	Logar em uma ORG Salesforce (Developer, Sandbox ou Playgroud também são afetadas)
2)	Certifique-se de que o “Meu Dominio” esteja devidamente ativo e configurado
3)	Certifique-se de esta no “Lightning Expirience”
4)	No menu superior direito, clique na engrenagem e escolha: [Developer Console]
5)	Na tela do Developer Console, selecione o menu File -> New -> Lightning Component
  * a. Informe o nome do componente como Screen
  * b. Marque as opções Lightning Tab e Lightning Page
  * c. Clique no botão Submit
6)	No corpo do componente, inserir o código abaixo:
```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes" access="global" >
	<lightning:navigation aura:id="navService"/>
    <lightning:button onclick="{!c.goTo}">Go to Screen 2</lightning:button> 
</aura:component>
```
7)	No menu esquerdo, clique na opção Controller, e insira o código abaixo:
```
({
	goTo : function(component, event, helper) {
        let pageReference = {
			type: 'standard__navItemPage',
			attributes: {
				'apiName': 'Screen2',
			}
		};

		component.find("navService").navigate(pageReference)
	}
})
```
8)	Na janela do Developer Console, clique novamente no menu File -> New -> Lightning Component
  * a. Informe o nome do componente como Screen2
  * b. Marque as opções Lightning Tab e Lightning Page
  * c. Clique no botão Submit
9)	No corpo do componente inserir o código abaixo:
```
<aura:component implements="force:appHostable,flexipage:availableForAllPageTypes" access="global" >
    <lightning:button onclick="{!c.goBack}">Goback to Screen 1</lightning:button> 
</aura:component>
```
10)	No menu esquerdo, clique na opção Controller, e insira o código abaixo:
```
({
	goBack : function(component, event, helper) {
		window.history.back()
	}
})
```
11)	 Acesse o SETUP (Configurações) e procure por TABS (Guias)
12)	Procure pela sessão Lightning Component Tabs e clique no botão [Novo]
13)	Selecione o componente  Screen, preencha o label e nome como “Screen”, selecione qualquer ícone e clique no botão avançar, certifique-se de  que a guia esteja ativa para todos os perfis.
14)	Repita o processo 12 e 13, dessa vez apontando para o componente  “Screen2”, insira o Label e o Nome como “Screen2”.
15)	No menu lateral do Setup, procure por Salesforce Navigation (Navegação Salesforce),  insira o Screen e Screen2 no topo da lista de itens selecionados e clique no botão [Salvar]
16)	Acesse o Salesforce Mobile através de um dispositivo móvel.
  * **a.	Atenção: O problema ocorre somente no dispositivo móvel, no emulador do Google Crhome o problema não ocorre.**
17)	Abra o menu lateral e escolha Screen
  * a. Clique no botão “Go to Screen 2”
  * b. Na nova tela que se abrirá, clique no botão “Goback to Screen 1”
  * c. Repita o processo clicando novamente no botão “Go to Screen 2”, note que a tela piscará e não será carregado a Screen2.
