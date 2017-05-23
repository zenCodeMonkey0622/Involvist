//
//  ViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import UIKit

class RootNavigationController: UINavigationController
{
    lazy var signInStoryboard: UIStoryboard = {
        let sb = UIStoryboard(name: "SignIn", bundle: nil)
        return sb
    }()
    
    lazy var authenticator: AuthService = {
        let a = Authenticator()
        return a
    }()
    
    override func viewDidLoad()
    {
        super.viewDidLoad()
        // Do any additional setup after loading the view, typically from a nib.
        
        // load sign-in view controller
        if let signInVc = signInStoryboard.instantiateViewController(withIdentifier: "SignInViewController") as? SignInViewController
        {
            signInVc.authProvider = self.authenticator
            signInVc.navDelegate = self
            self.pushViewController(signInVc, animated: true)
        }
        
    }

    override func didReceiveMemoryWarning()
    {
        super.didReceiveMemoryWarning()
        // Dispose of any resources that can be recreated.
    }


}

