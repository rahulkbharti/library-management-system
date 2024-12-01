1. Backend in Nodejs(Expressjs)
2. Frontend in Reactjs

# Get Started

Before starting the server, make sure that the MariaDB server is running.
download mariadb from [maridb](https://mariadb.org/download/?t=mariadb&p=mariadb&r=11.6.2&os=windows&cpu=x86_64&pkg=msi&mirror=starburst_mumbai)
1. Start the MariaDB server:
    ```sh
    sudo service mariadb start
    ```

2. Clone the git repository:
    ```sh
    git clone <repository-url>
    cd library-system
    ```
3. Edit .env.development/production
File Accoring to your mariadb database
    ```env
    SECRET_KEY=production-secret-key
    DB_HOST=localhost
    DB_USER=rahul
    DB_PASSWORD=rahul123
    DB_DATABASE=Library_System
    ```
4. Set up the backend:
    ```sh
    cd backend
    npm install
    npm start
    ```

5. Set up the frontend:
    ```sh
    cd frontend
    npm install
    npm run dev
    ```
