# ResetBaseline
*Volver a la página de [[Mover|Movers-RosettaScripts]].*
## ResetBaseline

Usa este mover para llamar al método reset_baseline en los filtros Operator y CompoundStatement. El mover Monte Carlo se encarga de
restablecer por sí mismo, así que no hace falta restablecer si usas MC.

```xml
<ResetBaseline name="(&string)" filter="(&filter)"/>
```
- filter: el nombre del filtro Operator o CompoundStatement.


##Véase también

* [[OperatorFilter]]
* [[CompoundStatementFilter]]
* [[GenericMonteCarloMover]]
* [[I want to do x]]: guía para elegir un mover
