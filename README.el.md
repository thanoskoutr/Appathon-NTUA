# Appathon-NTUA 2020

## Ταινίες σε Streaming Πλατφόρμες

### Περιγραφή Θέματος
Σκοπός της εργασίας, είναι η δημιουργία μίας δικτυακής εφαρμογής στην οποία ο χρήστης θα μπορεί να αναζητήσει ταινίες που βρίσκονται σε streaming πλατφόρμες (Netflix, Hulu, Amazon Prime, Disney+). Ο χρήστης μπορεί να επιλέξει ως input διάφορα χαρακτηριστικά ταινιών και πολλαπλές streaming πλατφόρμες, ωστέ να βρει τις ταινίες που ψάχνει. Επίσης επιστρέφονται και στατιστικά για το πλήθος των ταινιών κάθε πλατφόρμας σε μορφή γραφήματος πίτας. Η εφαρμογή είναι βασισμένη πάνω σε μια βάση δεδομένων με πάνω από 16.000 ταινίες με πληροφορίες για αυτές και επίσης γίνεται σύνδεση με εξωτερικό δωρεάν API ταινιών [TheMovieDB](https://developers.themoviedb.org/3), από το οποίο παίρνουμε αφίσες για κάθε ταινία που εμφανίζουμε.

![Usage](images/usage.gif)

### Κύρια λειτουργικά χαρακτηριστικά του συστήματος.
- Το input θα είναι είτε:
  - Streaming πλατφόρμα (υποχρεωτικό)
  - Τίτλος ταινίας
  - Όνομα σκηνοθέτη
  - Γλώσσα
  - Είδος
  - Χρονολογία
  - Χώρα παραγωγής
  - Ηλικία

- Καθώς και ο τρόπος αναπαράστασης της σειράς των αποτελεσμάτων με βάση:
  - Τίτλο ταινίας
  - Όνομα σκηνοθέτη
  - Χρονολογία
  - Διάρκεια ταινίας
  - Βαθμολογία στο IMDb
  - Βαθμολογία στο Rotten Tomatoes
  - Αριθμός αποτελεσμάτων ανα σελίδα


- Το output θα είναι:
  - Οι αντίστοιχες ταινίες με βάση το input του χρήστη.
  - Σε ποιες πλατφόρμες είναι διαθέσιμες.
  - Φωτογραφία για κάθε ταινία, με σύνδεση με το το API ταινιών [TheMovieDB](https://developers.themoviedb.org/3).
  - Πληροφορίες για την ταινία όπως (Τίτλος ταινίας, Όνομα σκηνοθέτη, Χρονολογία, Είδος, Γλώσσα, Χώρα παραγωγής, Διάρκεια ταινίας, Βαθμολογία στο IMDb, Βαθμολογία στο Rotten Tomatoes, Ηλικία)
  - Γράφημα με το πλήθος των ταινιών ανά πλατφόρμα.


### Τεχνολογίες Υλοποίησης
- Database:
  - MySQL Ver 14.14
- Backend:
  - Node.js v12.14.0
- Frontend:
  - React (create-react-app 3.3.0)
  - Bootstrap v4.5.2
  - HTML / CSS
  - ChartJS

- Dataset by:
  - https://www.kaggle.com/ruchi798/movies-on-netflix-prime-video-hulu-and-disney, which is scraped from Reelgood.com.


## Οδηγίες Εγκατάστασης

### Προαπαιτούμενα
- MySQL ή MariaDB server (> v14.0)
  - Εγκατάσταση για Windows από [εδώ](https://www.apachefriends.org/index.html) μέσω του XAMPP.
  - Εγκατάσταση για Linux / Windows από τα Official Guides [εδώ](https://dev.mysql.com/doc/mysql-getting-started/en/).
- Node.js (> v10.0)
  - Εγκατάσταση για Windows/macOS από [εδώ](https://nodejs.org/en/download).
  - Εγκατάσταση για Linux μέσω packet manager απο [εδώ](https://nodejs.org/en/download/package-manager/).

### Κατέβασμα εφαρμογής από GitHub
Σε κάποιο φάκελο του συστήματος κάνουμε clone, και κάνουμε cd στον φάκελο της εφαρμογής:
```
git clone https://github.com/thanoskoutr/Appathon-NTUA.git
cd Appathon-NTUA
```
### Σετάρισμα Βάσης
Στον φάκελο της εφαρμογής τρέχουμε την παρακάτω εντολή, που δημιουργεί την βάση και τον κατάλληλο πίνακα:
```
mysql -u root -p < ./database/Movies.sql
```
Έπειτα, τρέχουμε την παρακάτω εντολή που περνάει όλα τα δεδομένα στην βάση:
```
mysql -u root -p appathon_03116073 < ./database/appathon_dump.sql
```

### Environmental Variables (.env)
Ανοίγουμε το αρχείο `./back-end/.env.example`, ώστε να εισαχθούν οι κατάλληλες τιμές στις μεταβλητές περιβάλλοντος, για την σύνδεση με τη βάση δεδομένων, καθώς και το API Key για το TheMovieDB API.

#### Σύνδεση με την βάση
Αντικαθηστούμε τα `DB_USER`, `DB_PASS` με τα credentials του root χρήστη της βάσης:
```
DB_HOST=localhost
DB_USER=root
DB_PASS=
DB_NAME=appathon_03116073
TMDB_API_KEY=
```
#### Σύνδεση με το API του TMDB
Για το API key του TheMovieDB, θα πρέπει να δημιουργηθεί ένας λογαριασμός στο [TMDB](https://www.themoviedb.org/signup) και από κει στις ρυθμίσεις του λογαριασμού θα πρέπει να γίνει αίτηση για ένα API key.

Αλλιώς αν δεν προστεθεί κανένα κλειδί στην μεταβλητή `TMDB_API_KEY`, απλά στην εφαρμογή δεν θα εμφανίζονται οι αφίσες των ταινιών.

#### Αλλαγή ονόματος αρχείου
Αφού τα αλλάξουμε κατάλληλα, το αποθηκεύουμε ώς `.env`, ώστε να λειτουργήσει σωστά:

**Linux/macOS:**
```
mv ./back-end/.env.example ./back-end/.env
```
**Windows:**
```
RENAME .\back-end\.env.example .env
```

### Αυτόματη Εκκίνηση

**Linux/macOS:**
```
./deploy.sh
```
**Windows:**
```
deploy.bat
```

Όταν τελειώσει τo deploy script, η εφαρμογή θα είναι διαθέσιμη στο link:
```
http://localhost:5000
```

### Σημειώσεις:
- *Το site έχει δοκιμαστεί στους browser: Mozilla Firefox, Google Chrome, Microsoft Edge.*
- *Η εφαρμογή έχει αναπτυχθεί σε Linux (Ubuntu 18.04.5), άλλα έχει δοκιμαστεί επιτυχώς και σε Windows 10, με MySQL μέσω του XAMPP και του Node.js για Windows.*

### Χειροκίνητη Εκκίνηση *(Σε περίπτωση σφάλματος αυτόματης εκκίνησης)*
#### Εκκίνηση back-end
Τώρα μπορεί να ξεκινήσει ο back-end server κανονικά εφόσων βγάλει και μήνυμα επιτυχής σύνδεσης με την βάση:
```
cd ./back-end
npm install
npm start
```
#### Εκκίνηση front-end
Έπειτα, εκκινούμε τον front-end server που ακούει στην πόρτα 5000. Άμα χρειάζεται αλλαγή απλά αλλάζουμε αριθμό πόρτας:
```
cd ./front-end
yarn install
yarn build
npm install -g serve
serve -s build -l 5000
```
