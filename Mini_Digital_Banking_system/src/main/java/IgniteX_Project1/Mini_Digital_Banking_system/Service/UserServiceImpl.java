package IgniteX_Project1.Mini_Digital_Banking_system.Service;

import IgniteX_Project1.Mini_Digital_Banking_system.DTO.UserResponse;
import IgniteX_Project1.Mini_Digital_Banking_system.Exceptions.UserNotFound;
import IgniteX_Project1.Mini_Digital_Banking_system.Model.UserInfo;
import IgniteX_Project1.Mini_Digital_Banking_system.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService{

    private  final UserRepository userRepository;

    public UserServiceImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserResponse getUserById(long id) {
        UserInfo userInfo = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFound("User not found"));
        return mapToResponse(userInfo);
    }

    private UserResponse mapToResponse(UserInfo userInfo) {
        UserResponse userResponse = new UserResponse();
        userResponse.setUserId(userInfo.getUserId());
        userResponse.setFullName(userInfo.getFirstName() + " " + userInfo.getLastName());
        userResponse.setEmail(userInfo.getEmail());
        userResponse.setBvn(userInfo.getBvn());
        userResponse.setNInNum(userInfo.getNInNum());
        userResponse.setUserCreatedAt(userInfo.getUserCreatedAt());
        userResponse.setUserModifiedAt(userInfo.getUserModifiedAt());

        return userResponse;
    }
}
