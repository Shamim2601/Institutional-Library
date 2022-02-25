
# Institutional Library



## About The Project ##


Institutional Library is an Oracle powered node website. It is a feature-rich online management solution for any institution seeking to administer their library online.


### Built with ###
This section should list any major framework/library used to build this Project.

- Nodejs
- EJS
- HTML
- CSS
- OracleDB

## Getting Started ##

Follow the step by step installation procedure to install and run this on your machine.

### Prerequisites ###
Make sure you have node and oracle installed in your device.

`NodeJs`: Install from [here](https://nodejs.org/en/download/)

`Oracle`: Install oracle from [here](https://www.oracle.com/downloads/) and register for an account.

### Installation ###

#### Getting the repository #####
1. clone the repository
    ```bash
    git clone git@github.com:Shamim2601/TermProject.git
    ```
2. If you don't have git installed in your device the download zip.

3. Go the directory where the repo is at and open the command line.
4. Install NPM packages
    ```bash
    npm install
    ```
#### Setting up the database  ####
1. Go to the sql plus.
2. Enter credentials
    ```bash
    username: sys as sysdba
    password: password
    ```
3. Create a new user C##INSLIB
    ```sql
    create user C##INSLIB identified by PROJECT;
    grant dba to C##INSLIB;
    ```
4. Find file dump files in `public/sql`.
5. head over to your database GUI (`Navicat/DataGrip/sql plus`) 
6. Import data from sql files depending upon the GUI.
7. Run and commit them.

#### Setting up the enviorment varibales #### 
Create a new file `.env` in the root directory and the file should have the followings:
    
    EMAIL = Your_Email
    PASSWORD = Your_Password
    
#### Run The Project ####
Go to your favoritye code editor and run
```bash
npm run device
```
The Project should be working!

