MVC - System Rezerwacji Biletów na wydarzenia sportowe i kulturalne.

1.Opis projektu:

System Rezerwacji Biletów to aplikacja internetowa stworzona w technologii Node.js z wykorzystaniem architektury MVC. System ten umożliwia zarządzanie wydarzeniami oraz rezerwację biletów przez użytkowników.

Dane przechowywane są w bazie MongoDB Atlas, a interfejs użytkownika został wykonany przy użyciu EJS oraz Bootstrap.

2.Funkcjonalności:

2a. Zarządzanie wydarzeniami (CRUD)

- Dodawanie nowych wydarzeń
- Wyświetlanie listy wydarzeń
- Edycja istniejących wydarzeń
- Usuwanie wydarzeń

2b. Rezerwacja biletów

- Rezerwacja miejsca na wybrane wydarzenie
- Automatyczne zmniejszanie liczby dostępnych miejsc
- Brak możliwości rezerwacji po wyczerpaniu miejsc

2c. Wyszukiwanie wydarzeń

- Wyszukiwanie wydarzeń po nazwie

2d. Informacje pogodowe

- Pobieranie aktualnej pogody dla lokalizacji wydarzenia
- Wyświetlanie temperatury oraz warunków pogodowych (Zachmurzenie,Bezchmurnie etc..)
- Integracja z API Open-Meteo

2e. Walidacja formularzy

- Wymagana nazwa wydarzenia
- Wymagana data wydarzenia
- Minimalna liczba miejsc większa od 0

3. Zastosowane technologie

Backend:

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Axios

Frontend:

- EJS
- Bootstrap 5



4. Architektura projektu

Projekt został wykonany zgodnie z wzorcem MVC (Model-View-Controller).

4A. Model

Odpowiada za komunikację z bazą danych MongoDB.


4B. View

Widoki generowane przez EJS.

4C. Controller

Obsługuje logikę biznesową aplikacji.



INSTALACJA:

1. Sklonuj repozytorium:

wprowadź do terminala: " git clone https://github.com/KrzysztofWrbl/MVC.git "


2. Przejdź do katalogu projektu:

wprowadź do terminala: " cd Projekt/rezerwacja-biletow"


3. Zainstaluj zależności:

wprowadź do terminala: " npm install "


4. Utwórz w gównym folderze repezytorium plik " .env ".

do powyższego pliku wklej poniższy kod:

MONGO_URI=<adres połączenia MongoDB Atlas>
PORT=3000

W miejsce "adres połączenia MongoDB Atlas" należy wkleić własny connection string uzyskany po utworzeniu konta w MongoDB Atlas.

5. Uruchom aplikację:

wprowadź do terminala: " npm run dev "


6. Uruchomienie

Po uruchomieniu aplikacja będzie dostępna w przeglądarce pod adresem:

http://localhost:3000


