// how to generate the password field? is it needed for test purposes?
// maybe for test we always log in with root so we don't need to log in
// with the user? should a test actually log in with the user???
db.getCollection("clients").insert({isActive: true,
                                    username: 'ddbd5b0c-f892-4361-83c6-286ae4fca58f',
                                    secret: 'cd989f8c-b1b7-4e96-936e-72aaf7cc5406',
                                    grant_types: ['password']})