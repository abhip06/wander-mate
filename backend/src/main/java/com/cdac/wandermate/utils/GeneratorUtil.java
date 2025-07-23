package com.cdac.wandermate.utils;

import java.util.Random;

public class GeneratorUtil {
    public static String generateUsername(String email) {
        String namePart = email.substring(0, email.indexOf('@'));
        String randomSuffix = generateRandomAlphanumeric(4);

        return namePart + randomSuffix;
    }

    private static String generateRandomAlphanumeric(int length) {
        String chars = "abcdefghijklmnopqrstuvwxyz0123456789";
        StringBuilder sb = new StringBuilder();
        Random random = new Random();

        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }

        return sb.toString();
    }
}
