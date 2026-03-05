# UndergroundRadio ::^33000066

##### GROUPE 6

## 🎯 VOTRE MISSION

### Vous êtes la radio pirate de NeonCity. En temps normal : synthwave calme. En crise : la voix

### de la résistance. Barres audio animées, effet machine à écrire sur les messages.

## 📡 CONTRAT D'INTERFACE

##### VOUS ÉMETTEZ :

```
eventBus.emit('radio:broadcast', {
message: 'BLACKOUT TOTAL. La ville est dans le noir.',
frequency: '91.3',
isEmergency: true
})
```
##### VOUS ÉCOUTEZ :

```
eventBus.on('hacker:command', ({ command }) => { ... })
eventBus.on('power:outage', ({ severity }) => { ... })
eventBus.on('weather:change', ({ condition }) => { ... })
```
## 🎨 ÉTATS VISUELS

##### ÉTAT NORMAL

```
Style radio FM rétro. Fréquence [ 87. 7 FM ]. Titre
'NEON FM - La Voix de la Cité'. 12 - 16 barres audio
animées. Voyant ON AIR rouge. Message :
'Synthwave non-stop. La ville brille pour vous.'
```
##### ÉTAT CRISE

```
Fréquence change ( 91. 3 ou 666. 6 ). Titre passe en
'☢ UNDERGROUND RADIO'. Barres plus intenses.
Messages urgents en machine à écrire.
```
## ⚡ RÉACTION PAR COMMANDE

Brief opérationnel NeonCity - Jour 2


```
Commande Votre
réaction
Visuels
```
```
(initial) 87. 7 FM Synthwave non-stop. La ville brille pour vous.
```
```
weather:change
storm
87. 7 FM ⚠ ALERTE MÉTÉO - Pluie toxique détectée. Restez chez vous.
```
```
power:outage partial 91. 3 FM ⚡ COUPURE ZONES B-D. Les équipes sont sur place.
```
```
power:outage total 91. 3 FM ☠ BLACKOUT TOTAL. La ville est dans le noir. Restez calmes.
```
```
hacker:command =
'riot'
```
##### 666. 6 FM LA^ RÉSISTANCE^ PARLE.^ LE^ MOMENT^ EST^ VENU.^ NEON^ CITY

##### APPARTIENT AU PEUPLE.

```
hacker:command =
'love'
```
##### 88. 8 FM 💕 UN MESSAGE DE PAIX. AIMEZ-VOUS. LA NUIT EST BELLE.

```
hacker:command =
'reset'
87. 7 FM Retour programme normal
```
## ✅ CRITÈRE DE SUCCÈS

#### Ça marche si :

```
Quand le prof tape 'riot', votre fréquence passe à 666. 6 et le message de la résistance s'affiche en
machine à écrire.
```
## 📋 CHECKLIST

```
1. Lire ce brief en entier ( 5 min)
```
```
2. Dézipper le repo et faire npm install
```
```
3. Lancer npm run dev → vérifier localhost: 3006
```
```
4. Faire la UI statique en état NORMAL (sans events)
```
```
5. Brancher l'émission de votre event → tester en console (F 12 )
```
```
6. Brancher les listeners → tester avec le bouton SIMULATE
```
```
7. Vérifier : return () => unsub() dans chaque useEffect
```
```
8. Commit + push AVANT 15 h 00
```

DEADLINE : 15 h 00. Le code doit être commité et pushé. Après 15 h 00 , le prof lance l'assemblage avec ce qui
est disponible.


