#!/bin/bash

echo "Configuring backend .env file..."
echo ""

cat > .env << EOF
MONGO_URI=mongodb+srv://herosupravat_db_user:Supravat123@cluster0.jmnrfxz.mongodb.net/merndb?appName=Cluster0
JWT_SECRET=mern_ecommerce_jwt_secret_key_2025_secure_token_change_in_production
PORT=5000
EOF

echo ".env file created successfully!"
echo ""
echo "Configuration:"
echo "- MongoDB: Connected to merndb database"
echo "- JWT Secret: Configured"
echo "- Port: 5000"
echo ""
echo "Next steps:"
echo "1. Run: npm run seed    (to create admin user)"
echo "2. Run: npm run dev     (to start the server)"
echo ""
