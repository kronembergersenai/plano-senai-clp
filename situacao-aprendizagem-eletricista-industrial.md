# SITUAÇÃO DE APRENDIZAGEM - ELETRICISTA INDUSTRIAL

| SITUAÇÃO DE APRENDIZAGEM | Cód. SA-EI-CLP-001 |
|--------------------------|-------------------|
| **Curso:** | Técnico Eletricista Industrial |
| **Unidade curricular:** | Controladores Lógicos Programáveis e IHM |
| **Carga Horária:** | 60h |
| **Modalidade:** | Aprendizagem Industrial |

## ESTRATÉGIA DESAFIADORA:
☑️ **Projeto**  
☐ Situação problema  
☐ Estudo de caso  
☐ Pesquisa aplicada

## OBJETIVOS:

1. **Desenvolver e implementar programa de CLP** em linguagem Ladder para controle de máquinas industriais, aplicando instruções lógicas e de temporização
2. **Configurar e programar Interface Homem-Máquina (IHM)** integrada ao sistema de controle, criando telas intuitivas para operação e monitoramento
3. **Elaborar diagramas elétricos e de comando** seguindo normas técnicas NBR 5444/IEC 60617, garantindo representação adequada dos circuitos
4. **Aplicar conceitos de segurança operacional** com implementação de modos local/remoto e dispositivos de proteção
5. **Realizar análise preliminar de riscos (APR)** e implementar medidas de controle de segurança conforme normas vigentes

## CONTEXTUALIZAÇÃO:

No ambiente industrial moderno, o eletricista industrial desempenha papel fundamental na **implementação e manutenção de sistemas automatizados**. Com a crescente demanda por **Indústria 4.0**, o profissional deve dominar tecnologias de controle avançadas, incluindo CLPs, IHMs e sistemas supervisórios.

O cenário proposto simula uma **indústria metalúrgica** que necessita automatizar sua linha de produção para aumentar **eficiência, qualidade e segurança operacional**. O projeto envolve a automação de duas estações de trabalho:

- **Estação 1:** Sistema de bombeamento com controle de nível automatizado
- **Estação 2:** Esteira transportadora com controle de velocidade variável

Esta experiência prepara o aluno para atuar em **diversos segmentos industriais**, desenvolvendo competências essenciais como:
- Programação de sistemas de controle
- Interpretação de documentação técnica
- Aplicação de normas de segurança
- Trabalho colaborativo em projetos complexos
- Resolução de problemas técnicos

## DESAFIO:

**CENÁRIO:** A empresa MetalTech Ltda. contratou sua equipe para modernizar o sistema de controle da linha de produção. O sistema atual é totalmente manual e apresenta riscos operacionais.

**MISSÃO:** Desenvolver um sistema automatizado completo que contemple:

### Estação 1 - Sistema de Bombeamento:
- Controle automático de nível de tanque usando sensores
- Partida/parada automática da bomba conforme nível
- Alarmes visuais e sonoros para situações anômalas
- Modo manual para manutenção

### Estação 2 - Esteira Transportadora:
- Controle de velocidade através de inversor de frequência
- Detecção de presença de produto
- Contagem de peças transportadas
- Parada de emergência em pontos estratégicos

### Requisitos do Sistema:
- **Segurança:** Implementar chave seletora LOCAL/REMOTO
- **Interface:** Desenvolver IHM com 3 telas (Principal, Estação 1, Estação 2)
- **Comunicação:** Integração CLP-IHM via Ethernet
- **Documentação:** Diagramas elétricos e manual de operação
- **Qualidade:** Seguir normas técnicas ABNT/IEC

## ROTEIRO EXPERIMENTAL DETALHADO:

### **ETAPA 1: Planejamento e APR (8h)**
**Atividades:**
- Análise do escopo do projeto em equipe
- Elaboração da Análise Preliminar de Riscos (APR)
- Identificação de energias perigosas e medidas de controle
- Definição de cronograma e divisão de tarefas

**Entregas:**
- Documento APR completo
- Cronograma de execução
- Lista de EPIs necessários

### **ETAPA 2: Padronização de Tags (4h)**
**Atividades:**
- Definição de nomenclatura padronizada para tags
- Organização lógica: entradas, saídas, variáveis internas
- Criação de tabela de símbolos no TIA Portal

**Exemplos de Tags:**
```
EST1_NIVEL_ALTO     // Sensor de nível alto - Estação 1
EST1_BOMBA_LIGA     // Comando bomba - Estação 1  
EST2_VEL_MOTOR      // Velocidade motor - Estação 2
MODO_LOCAL          // Chave modo local/remoto
EMERG_GERAL         // Botão emergência geral
```

### **ETAPA 3: Diagramas Elétricos (8h)**
**Atividades:**
- Elaboração de diagrama unifilar geral
- Diagramas de comando para cada estação
- Esquemas de ligação CLP e dispositivos de campo
- Utilização de software CAD elétrico (AutoCAD Electrical/EPLAN)

**Normas Aplicadas:**
- NBR 5444 - Símbolos gráficos para instalações elétricas
- IEC 60617 - Símbolos gráficos para diagramas

### **ETAPA 4: Configuração Hardware TIA Portal (6h)**
**Atividades:**
- Criação de novo projeto no TIA Portal V17
- Configuração do CLP S7-1215DC/DC/DC
- Adição e configuração da IHM KTP400 Basic
- Definição de endereçamento físico I/O
- Configuração de comunicação Profinet

### **ETAPA 5: Programação Ladder (12h)**
**Atividades:**
- Desenvolvimento da lógica de controle em Ladder
- Implementação de intertravamentos de segurança
- Programação de temporizadores e contadores
- Criação de blocos de função (FB) modulares
- Testes de simulação offline

**Blocos a Desenvolver:**
- FB_Bomba: Controle da bomba com proteções
- FB_Esteira: Controle da esteira com inversor
- FB_Seguranca: Lógicas de segurança geral

### **ETAPA 6: Programação IHM (8h)**
**Atividades:**
- Criação das 3 telas no WinCC Basic
- Implementação de navegação entre telas
- Configuração de botões e indicadores
- Criação de pop-ups para alarmes
- Configuração de receitas e trends

**Estrutura das Telas:**
- **Tela Principal:** Visão geral do processo, navegação
- **Tela Estação 1:** Comandos e status do sistema de bombeamento
- **Tela Estação 2:** Comandos e status da esteira transportadora

### **ETAPA 7: Implementação Segurança (6h)**
**Atividades:**
- Programação da chave LOCAL/REMOTO
- Implementação de paradas de emergência
- Configuração de alarmes de processo
- Testes de todas as funções de segurança

### **ETAPA 8: Montagem Física (8h)**
**Atividades:**
- Montagem dos componentes no painel
- Conexões elétricas conforme diagramas
- Identificação de cabos e bornes
- Testes de continuidade e isolamento
- Verificação conforme NBR 5410

### **ETAPA 9: Testes e Comissionamento (6h)**
**Atividades:**
- Download do programa no CLP
- Testes ponto a ponto de todas as I/O
- Simulação de processos
- Testes integrados CLP-IHM
- Ajustes finos e otimizações

### **ETAPA 10: Documentação Final (4h)**
**Atividades:**
- Elaboração do manual de operação
- Atualização dos diagramas conforme executado
- Relatório técnico do projeto
- Lista de materiais utilizada
- Apresentação dos resultados

## INTEGRAÇÃO E ENRIQUECIMENTO:

### **Metodologias Ativas:**
- **Aprendizagem Baseada em Projetos (ABP):** Desenvolvimento colaborativo de solução completa
- **Peer Learning:** Troca de conhecimentos entre equipes
- **Gamificação:** Competição saudável entre grupos com ranking de projetos

### **Tecnologias Complementares:**
- **Simulação Virtual:** PLCSIM Advanced para testes sem hardware
- **Realidade Aumentada:** Visualização 3D dos painéis usando tablets
- **IoT:** Monitoramento remoto via aplicativo mobile
- **IA:** Análise preditiva de falhas usando dados históricos

### **Recursos Digitais:**
- **TIA Portal V17:** Software de programação principal
- **PLCSIM:** Simulador de CLP para testes offline
- **WinCC RT Advanced:** Supervisório para monitoramento
- **AutoCAD Electrical:** Desenhos elétricos profissionais
- **MS Project:** Gestão de cronograma e recursos

### **Estratégias de Avaliação:**

| **Modalidade** | **Peso** | **Critérios** |
|----------------|----------|---------------|
| **Projeto Prático** | 40% | Funcionalidade, inovação, documentação |
| **Avaliação Teórica** | 25% | Conhecimentos técnicos aplicados |
| **Trabalho em Equipe** | 20% | Colaboração, comunicação, liderança |
| **Apresentação** | 15% | Clareza, domínio técnico, criatividade |

### **Competências Socioemocionais:**
- **Responsabilidade:** Cumprimento de prazos e qualidade técnica
- **Proatividade:** Busca por soluções inovadoras
- **Comunicação:** Apresentação técnica clara e objetiva
- **Liderança:** Coordenação de atividades em equipe
- **Ética:** Cumprimento de normas de segurança

---

## RECURSOS NECESSÁRIOS:

### **Infraestrutura:**
- Laboratório de automação com 10 bancadas
- Rede elétrica 220/380V trifásica
- Rede de dados Ethernet estruturada
- Projetor multimídia e sistema de áudio

### **Software:**
- Licenças TIA Portal V17 (10 unidades)
- Licenças AutoCAD Electrical (5 unidades)
- Sistema supervisório (SCADA)

### **Segurança:**
- EPIs: óculos, luvas dielétricas, calçados de segurança
- EPCs: extintores, kit primeiros socorros
- Procedimentos de bloqueio e etiquetagem (LOTO)

---

## RESULTADOS ESPERADOS:

Ao final desta situação de aprendizagem, o aluno será capaz de:

✅ **Programar CLPs** com competência técnica adequada ao mercado  
✅ **Desenvolver IHMs** funcionais e intuitivas  
✅ **Interpretar e elaborar** documentação técnica profissional  
✅ **Aplicar normas de segurança** em ambientes industriais  
✅ **Trabalhar em equipe** de forma colaborativa e eficiente  
✅ **Resolver problemas** complexos de automação industrial  

---

**Título:** Implementação de Sistema de Controle Automatizado para Linha de Produção Industrial

**Alunos:** _________________________________

**Instrutor:** _________________________________

**Data:** _________________________________

---

| **Visto pós correção** | **Instrutor:** | **Alunos:** |
|------------------------|----------------|-------------|
|                        |                |             |