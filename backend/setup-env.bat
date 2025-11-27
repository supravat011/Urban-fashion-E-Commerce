@echo off
echo Configuring backend .env file with corrected MongoDB URL...
echo.

(
echo MONGO_URI=mongodb+srv://herosupravat_db_user:Supravat123@cluster0.jmrnfxz.mongodb.net/merndb?retryWrites=true^&w=majority^&appName=Cluster0
echo JWT_SECRET=mern_ecommerce_jwt_secret_key_2025_secure_token_change_in_production
echo PORT=5000
) > .env

echo .env file created successfully!
echo.
echo Configuration:
echo - MongoDB: Connected to merndb database
echo - Cluster: cluster0.jmrnfxz.mongodb.net (corrected)
echo - JWT Secret: Configured
echo - Port: 5000
echo.
echo Next steps:
echo 1. Run: npm run seed    (to create admin user)
echo 2. Run: npm run dev     (to start the server)
echo.
pause
