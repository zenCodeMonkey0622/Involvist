//
//  SignUpPageViewController.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 6/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignUpPageViewController: UIPageViewController, SignUpProgressDelegate
{
    weak var navDelegate: LocalNavigationDelegate?
    weak var userServiceDelegate: UserServiceDelegate?
    
    lazy var sourceStoryboard: UIStoryboard = {
        let sb = UIStoryboard(name: "SignIn", bundle: nil)
        return sb
    }()
    
    // keeps one strong reference to this view controller's 
    // data source and delegate object
    var pageDataSource: UIPageViewControllerDataSource?
    
    override func viewDidLoad() {
        super.viewDidLoad()
        
        // create the data source and delegate
        let pageDataSource = SignUpPageDataSource(storyboard: sourceStoryboard)
        dataSource = pageDataSource
        delegate = pageDataSource as? UIPageViewControllerDelegate
        
        let firstVc = SignUpViewController.create()
        firstVc.signUpDelegate = self
        firstVc.userService = userServiceDelegate
        
        setViewControllers([firstVc], direction: .forward, animated: false, completion: nil)
    }
    
    // MARK: SignUpProgressDelegate
    
    func didCancelSignUp()
    {
        self.dismiss(animated: true, completion: nil)
    }
    
    func didRegisterUser(newUser: User)
    {
        
    }
    
    func didLocateUser()
    {
        
    }
    
    func didFinishSignUp()
    {
        
    }
}
