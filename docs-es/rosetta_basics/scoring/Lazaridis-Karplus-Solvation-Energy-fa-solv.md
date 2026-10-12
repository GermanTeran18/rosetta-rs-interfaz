La energía de solvatación de Lazaridis-Karplus (fa_sol) puntúa la energía de una molécula en solvente implícito mediante un modelo de solvente de exclusión gaussiana. El término se describió originalmente en [[este artículo | http://onlinelibrary.wiley.com/doi/10.1002/(SICI)1097-0134(19990501)35:2%3C133::AID-PROT1%3E3.0.CO;2-N/abstract]]. Rosetta usa este modelo con algunos ajustes: 

1. La función de energía de desolvatación tiene la forma exponencial descrita en las ecuaciones
5–7 solo para un cierto intervalo de distancias interatómicas. Para otras distancias, Rosetta
usa formas aproximadas (véase «Etable::analytic_lk_evaluation()»).

2. Por defecto se ignoran las contribuciones de algunos pares de átomos (p. ej., las contribuciones
intrarresiduo y las contribuciones ignoradas mediante el mecanismo de count-pair).

3. Se ignoran los desplazamientos de energía constantes DELTA_G_REF. Conceptualmente, este valor queda incorporado al cajón de sastre de energías constantes por tipo de residuo que es la energía de referencia.

Las energías de solvatación sin ponderar se expresan en kcal/mol. 
