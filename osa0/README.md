osan 0 tehtävien vastaukset

# 0.4: Uusi muistiinpano

```mermaid
sequenceDiagram
    actor user
    participant browser
    participant DOM
    participant server

    user->>browser: User writes note and presses save
    browser->>server: POST: https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    server->>browser: 302 FOUND, (redirect)
    deactivate server

    browser->>browser: check refs

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: 200 OK, main.css
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    server->>browser: 200 OK, main.js
    browser->>server: Get https://studies.cs.helsinki.fi/exampleapp/kuva.png
    server->>browser: 200 OK, kuva.png
    deactivate server
    browser->>browser: run js
    activate browser
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    server->>browser: 200 OK, data.json
    browser->>browser: onreadystatechange (readyState == 4 && status == 200) callback
    browser->>DOM: createElements (ul, li),<br>appendChild
    browser->>user: render page
    deactivate browser
```

# 0.5: Single Page App

```mermaid
sequenceDiagram
    actor user
    participant browser
    participant DOM
    participant server

    user->>browser: User selects link
    browser->>server: Get https://studies.cs.helsinki.fi/exampleapp/spa
    server->>browser: 200 OK, spa

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server->>browser: 200 OK, main.css
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    server->>browser: 200 OK, spa.js

    browser->>browser: run spa.js
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    server->>browser: 200 OK, data.json
    browser->>browser: execute js: xhttp.onreadystatechange
    browser->>DOM: redrawNotes, createElements
    browser->>user: render page
```

# 0.6: Uusi muistiinpano

```mermaid
sequenceDiagram
    actor user
    participant browser
    participant DOM
    participant server

    user->>browser: User selects save
    browser->>browser: onSubmit triggered,
    Note left of browser: Browser adds new note to DOM (notes.push(note))
    browser->>DOM: Add new note,
    Note left of browser: The browser executes the <br>callback function that renders the notes
    browser->>browser: redrawNotes,
    browser->>user: Rendered page

    Note left of browser: xhttpForPost.send()
    browser->>server: sendToServer(note)
    activate server

    deactivate server

```
