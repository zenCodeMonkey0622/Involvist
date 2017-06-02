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
                if let vc = signInStoryboard.instantiateViewController(withIdentifier: "SignUpPageViewController") as? SignUpPageViewController
                {
                    vc.navDelegate = self
                    vc.userServiceDelegate = self.userService
                    self.present(vc, animated: true, completion: nil)
                }
                break;
            case .privacyPolicy:
                // todo
                break;
            case .termsOfService:
                // todo
                break;
        }
    }
    
    func dismiss(viewController: UIViewController)
    {
        // will need more sophisticated logic later....
        self.popViewController(animated: true);
    }
}
