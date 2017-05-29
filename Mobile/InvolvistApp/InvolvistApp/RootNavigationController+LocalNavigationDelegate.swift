//
//  RootNavigationController+LocalNavigatorDelegate.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 5/22/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

extension RootNavigationController: LocalNavigationDelegate
{
    func navigateTo(destinationView: DestinationView)
    {
        switch destinationView
        {
            case .signUpView:
                if let vc = signInStoryboard.instantiateViewController(withIdentifier: "SignUpViewController") as? SignUpViewController
                {
                    vc.navDelegate = self
                    vc.userService = userService
                    self.present(vc, animated: true, completion: nil)
                }
        }
    }
    
    func dismiss(viewController: UIViewController)
    {
        // will need more sophisticated logic later....
        self.popViewController(animated: true);
    }
}
