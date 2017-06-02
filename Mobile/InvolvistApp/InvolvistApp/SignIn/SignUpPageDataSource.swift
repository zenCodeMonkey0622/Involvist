//
//  SignUpPageDataSource.swift
//  InvolvistApp
//
//  Created by Ruben Hansen-Rojas on 6/2/17.
//  Copyright © 2017 Involvist. All rights reserved.
//

import Foundation
import UIKit

class SignUpPageDataSource: NSObject, UIPageViewControllerDataSource, UIPageViewControllerDelegate
{
    weak var sourceStoryboard: UIStoryboard?
    
    init(storyboard: UIStoryboard)
    {
        self.sourceStoryboard = storyboard
    }
    
    // MARK: UIPageViewcontrollerDataSource
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerAfter viewController: UIViewController) -> UIViewController?
    {
        // todo
        return nil;
    }
    
    func pageViewController(_ pageViewController: UIPageViewController, viewControllerBefore viewController: UIViewController) -> UIViewController?
    {
        // todo
        return nil;
    }
    
    // MARK: UIPageViewControllerDelegate
    
}
